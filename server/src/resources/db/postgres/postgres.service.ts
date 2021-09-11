import { Injectable, NotFoundException } from '@nestjs/common'
import { isNull, keys, transform } from 'lodash'
import { omitBy } from 'lodash/fp'
import { pluralize } from 'mongoose'
import { PaginationOptions } from '../../list-params.pipe'
import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db.service'
import * as entities from './entities'

type ActiveRecord = typeof entities[keyof typeof entities]

const omitNull = omitBy(isNull)

@Injectable()
export class PostgresService extends DbService {
	private readonly entities: Record<string, ActiveRecord>

	constructor() {
		super()
		this.entities = transform(entities, (result, value, key) => {
			result[pluralize()!(key)] = value
		})
	}

	getResources() {
		return keys(this.entities)
	}

	getResourceCount(resource: string) {
		const Record = this.entities[resource]
		return Record.count()
	}

	async create(resource: string, payload: any) {
		const Record = this.entities[resource]
		delete payload.id
		const { id } = await Record.save(payload)
		return id
	}

	async findAll(resource: string, options: PaginationOptions) {
		const { match, sort, skip, limit } = options
		const Record = this.entities[resource]
		const [documents, count] = await Record.findAndCount({
			where: match,
			order: sort,
			take: limit,
			skip,
		})
		return { documents: documents.map(omitNull), count }
	}

	async findOne(resource: string, filter: any): FindOneResult
	async findOne(resource: string, id: string): FindOneResult
	async findOne(resource: string, filterOrId: any): FindOneResult {
		const Record = this.entities[resource]
		const record = await Record.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})
		return omitNull(record)
	}

	async update(resource: string, filter: any, update: any): UpdateResult
	async update(resource: string, id: string, update: any): UpdateResult
	async update(resource: string, filterOrId: any, update: any): UpdateResult {
		const Record = this.entities[resource]

		const record = await Record.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})

		// possibly remove file

		update.id = record.id
		await Record.save(update)
	}

	async delete(resource: string, filter: any): DeleteResult
	async delete(resource: string, id: string): DeleteResult
	async delete(resource: string, filterOrId: any): DeleteResult {
		const Record = this.entities[resource]

		const record = await Record.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})

		// remove file

		await Record.remove(record)
	}
}
