import { ConflictException, Injectable, NotFoundException, Type } from '@nestjs/common'
import { InjectConnection, SchemaFactory } from '@nestjs/mongoose'
import { isString, keys, transform } from 'lodash'
import { Connection, FilterQuery, pluralize } from 'mongoose'
import { PaginationOptions } from '../../list-params.pipe'
import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db.service'
import * as schemas from './schemas'

type Filter = FilterQuery<any>
type FilterOrId = Filter | string

@Injectable()
export class MongoService extends DbService {
	private readonly schemas: Record<string, any>

	constructor(
		@InjectConnection()
		private readonly connection: Connection,
	) {
		super()
		this.schemas = transform(schemas, (result, value: Type, key) => {
			result[pluralize()!(key)] = SchemaFactory.createForClass(value)
		})
	}

	private static getFilter(filterOrId: FilterOrId) {
		return isString(filterOrId) ? { _id: filterOrId } : filterOrId
	}

	private getModel(resource: string) {
		const schema = this.schemas[resource]
		return this.connection.model<any>(schema.name, schema)
	}

	getResources() {
		return keys(this.schemas)
	}

	getResourceCount(resource: string) {
		const collection = this.connection.db.collection(resource)
		return collection.estimatedDocumentCount()
	}

	async create(resource: string, payload: any): Promise<string> {
		const model = this.getModel(resource)
		const { _id } = await model.create(payload).catch(err => {
			if (err.code !== 11000) throw err
			throw new ConflictException()
		})
		return _id
	}

	async findAll(resource: string, options: PaginationOptions) {
		const { match, sort, skip, limit } = options
		const model = this.getModel(resource)

		const [result] = await model
			.aggregate()
			.match(match)
			.sort(sort)
			.facet({
				count: [
					{ $count: 'total' },
				],
				documents: [
					{ $limit: limit },
					{ $skip: skip },
				],
			})
			.project({
				total: {
					$ifNull: [
						{ $arrayElemAt: ['$count.total', 0] },
						0,
					],
				},
				documents: 1,
			})

		return result
	}

	async findOne(resource: string, filter: Filter): FindOneResult
	async findOne(resource: string, id: string): FindOneResult
	async findOne(resource: string, filterOrId: FilterOrId): FindOneResult {
		const filter = MongoService.getFilter(filterOrId)
		const model = this.getModel(resource)
		const document = await model.findOne(filter)
		if (!document) {
			throw new NotFoundException()
		}
		return document
	}

	async update(resource: string, filter: Filter, update: any): UpdateResult
	async update(resource: string, id: string, update: any): UpdateResult
	async update(resource: string, filterOrId: FilterOrId, update: any): UpdateResult {
		const filter = MongoService.getFilter(filterOrId)
		const model = this.getModel(resource)
		const document = await model.findOneAndUpdate(filter, update)
		if (!document) {
			throw new NotFoundException()
		}
		return document.file?.id
	}

	async delete(resource: string, filter: Filter): DeleteResult
	async delete(resource: string, id: string): DeleteResult
	async delete(resource: string, filterOrId: FilterOrId): DeleteResult {
		const filter = MongoService.getFilter(filterOrId)
		const model = this.getModel(resource)
		const document = await model.findOneAndDelete(filter)
		return document?.file?.id
	}
}
