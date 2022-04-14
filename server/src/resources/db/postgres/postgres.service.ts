import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { isNull, isString, keys, transform } from 'lodash'
import { omitBy } from 'lodash/fp'
import { pluralize } from 'mongoose'
import { FindOptionsWhere } from 'typeorm'
import { PaginationOptions } from '../../list-params.pipe'
import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db.service'
import * as entities from './entities'
import { Article } from './entities'
import { File } from './entities/file.entity'
import { Resource } from './entities'

type Entity = Article & typeof Article

type Filter = FindOptionsWhere<any>
type FilterOrId = Filter | string

const omitNull = omitBy(isNull)

@Injectable()
export class PostgresService extends DbService {
	private readonly entities: Record<string, Entity>

	constructor() {
		super()
		this.entities = transform(entities, (result, value, key) => {
			result[pluralize()!(key)] = value as any
		})
	}

	private static getFilter(filterOrId: FilterOrId) {
		return isString(filterOrId) ? { id: filterOrId } : filterOrId
	}

	private static getResourceId(resource: string, id: string) {
		return `${resource}-${id}`
	}

	private getEntity(resource: string) {
		const entity = this.entities[resource]
		if (!entity) {
			throw new NotFoundException('Resource not found')
		}
		return entity as Entity
	}

	getResources() {
		return keys(this.entities)
	}

	getResourceCount(resource: string) {
		return this.getEntity(resource).count()
	}

	async create(resource: string, payload: any) {
		delete payload.id
		const { id: _, ...newRecord } = payload

		if (payload.fileInfo) {
			newRecord.file = await File.save({
				objectId: payload.fileInfo.id,
				name: payload.fileInfo.name,
			})
		}

		const Entity = this.getEntity(resource)
		const { id } = await Entity.save(newRecord).catch(() => {
			throw new BadRequestException('Resource failed to save')
		})

		await Resource.save({
			id: PostgresService.getResourceId(resource, id),
			resource,
			resourceId: id,
			title: newRecord.title,
		})

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
		const record = await Entity.findOneOrFail({
			where: PostgresService.getFilter(filterOrId),
			relations: ['file'],
		}).catch(() => {
			throw new NotFoundException()
		})
		return omitNull(record)
	}

	async update(resource: string, filter: any, update: any): UpdateResult
	async update(resource: string, id: string, update: any): UpdateResult
	async update(resource: string, filterOrId: any, update: any): UpdateResult {
		const Entity = this.getEntity(resource)
		const record = await Entity.findOneOrFail({
			where: PostgresService.getFilter(filterOrId),
			relations: ['file'],
		}).catch(() => {
			throw new NotFoundException()
		})

		const { createdAt, updatedAt, file, ...newRecord } = update

		if (update.fileInfo) {
			newRecord.file = await File.save({
				id: record.file?.id || undefined,
				objectId: update.fileInfo.id,
				name: update.fileInfo.name,
			})
		}

		newRecord.id = record.id
		await Entity.save(newRecord)

		return update.fileInfo ? (record.file?.objectId || '') : ''
	}

	async delete(resource: string, filter: any): DeleteResult
	async delete(resource: string, id: string): DeleteResult
	async delete(resource: string, filterOrId: any): DeleteResult {
		const Entity = this.getEntity(resource)
		const record = await Entity.findOneOrFail({
			where: PostgresService.getFilter(filterOrId),
			relations: ['file'],
		}).catch(() => {
			throw new NotFoundException()
		})

		const resourceId = PostgresService.getResourceId(resource, record.id)
		await Entity.remove(record)
		await Resource.delete(resourceId)

		if (record.file) {
			await File.remove(record.file)
		}

		return record.file?.objectId || ''
	}
}
