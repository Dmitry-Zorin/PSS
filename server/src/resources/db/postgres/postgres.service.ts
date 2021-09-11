import { Injectable, NotFoundException } from '@nestjs/common'
import { isNull, keys, transform } from 'lodash'
import { omitBy } from 'lodash/fp'
import { pluralize } from 'mongoose'
import { PaginationOptions } from '../../list-params.pipe'
import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db.service'
import * as entities from './entities'

type Entity = typeof entities[keyof typeof entities]

const omitNull = omitBy(isNull)

@Injectable()
export class PostgresService extends DbService {
	private readonly entities: Record<string, Entity>

	constructor() {
		super()
		this.entities = transform(entities, (result, value, key) => {
			result[pluralize()!(key)] = value
		})
	}
	
	private getEntity(resource: string) {
		const entity = this.entities[resource]
		if (!entity) {
			throw new NotFoundException('Resource not found')
		}
		return entity
	}

	getResources() {
		return keys(this.entities)
	}

	getResourceCount(resource: string) {
		return this.getEntity(resource).count()
	}

	async create(resource: string, payload: any) {
		const Entity = this.getEntity(resource)
		delete payload.id
		const { id } = await Entity.save(payload)
		return id
	}

	async findAll(resource: string, options: PaginationOptions) {
		const { match, sort, skip, limit } = options
		const Entity = this.getEntity(resource)
		const [documents, total] = await Entity.findAndCount({
			where: match,
			order: sort,
			take: limit,
			skip,
		})
		return { documents: documents.map(omitNull), total }
	}

	async findOne(resource: string, filter: any): FindOneResult
	async findOne(resource: string, id: string): FindOneResult
	async findOne(resource: string, filterOrId: any): FindOneResult {
		const Entity = this.getEntity(resource)
		const record = await Entity.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})
		return omitNull(record)
	}

	async update(resource: string, filter: any, update: any): UpdateResult
	async update(resource: string, id: string, update: any): UpdateResult
	async update(resource: string, filterOrId: any, update: any): UpdateResult {
		const Entity = this.getEntity(resource)

		const record = await Entity.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})

		// possibly remove file

		update.id = record.id
		await Entity.save(update)
	}

	async delete(resource: string, filter: any): DeleteResult
	async delete(resource: string, id: string): DeleteResult
	async delete(resource: string, filterOrId: any): DeleteResult {
		const Entity = this.getEntity(resource)

		const record = await Entity.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})

		// remove file

		await Entity.remove(record)
	}
}