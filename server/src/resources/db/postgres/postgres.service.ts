import { Injectable, NotFoundException } from '@nestjs/common'
import { isNull, isString, keys, transform } from 'lodash'
import { omitBy } from 'lodash/fp'
import { pluralize } from 'mongoose'
import { FindOptionsWhere } from 'typeorm'
import { PaginationOptions } from '../../list-params.pipe'
import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db.service'
import { Article, File } from './entities'
import * as entities from './entities'

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

	getFileInfo(resource: string, fileId: string) {
		return File.findOneByOrFail({ id: fileId }).catch(() => {
			throw new NotFoundException()
		})
	}

	async create(resource: string, payload: any) {
		delete payload.id
		const { id: _, ...newRecord } = payload

		if (payload.fileInfo) {
			newRecord.file = await File.save({
				fileId: payload.fileInfo.id,
				name: payload.fileInfo.name,
			})
		}

		const Entity = this.getEntity(resource)
		const { id } = await Entity.save(newRecord)
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
				fileId: update.fileInfo.id,
				name: update.fileInfo.name,
			})
		}

		newRecord.id = record.id
		await Entity.save(newRecord)

		return update.fileInfo ? (record.file?.fileId || '') : ''
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
		await Entity.remove(record)

		if (record.file) {
			await File.remove(record.file)
		}

		return record.file?.fileId || ''
	}
}
