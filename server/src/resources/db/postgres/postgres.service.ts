import { Injectable, NotFoundException } from '@nestjs/common'
import { isNull, keys, transform } from 'lodash'
import { omitBy } from 'lodash/fp'
import { pluralize } from 'mongoose'
import { FileService } from '../../file/file.service'
import { PaginationOptions } from '../../list-params.pipe'
import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db.service'
import * as entities from './entities'

type Entity = typeof entities[keyof typeof entities]

const omitNull = omitBy(isNull)

@Injectable()
export class PostgresService extends DbService {
	private readonly entities: Record<string, Entity>

	constructor(private readonly fileService: FileService) {
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
		delete payload.id
		const { id: _, ...newPayload } = payload

		if (payload.file) {
			const file = await this.fileService.upload(resource, payload.file)
			const FileEntity: any = this.getEntity('files')
			newPayload.file = await FileEntity.save({
				fileId: file.id,
				name: payload.file.originalname,
			})
		}

		const Entity = this.getEntity(resource)
		const { id } = await Entity.save(newPayload)
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

		const record = await Entity.findOneOrFail(filterOrId, { relations: ['file'] }).catch(() => {
			throw new NotFoundException()
		})

		if (update.file) {
			const file = await this.fileService.upload(resource, update.file)
			const FileEntity: any = this.getEntity('files')

			const updateFile: any = {
				fileId: file.id,
				name: update.file.originalname,
			}

			if (record.file?.fileId) {
				await this.fileService.delete(resource, record.file.fileId)
				updateFile.id = record.file.id
			}

			update.file = await FileEntity.save(updateFile)
		}

		update.id = record.id
		await Entity.save(update)
	}

	async delete(resource: string, filter: any): DeleteResult
	async delete(resource: string, id: string): DeleteResult
	async delete(resource: string, filterOrId: any): DeleteResult {
		const Entity = this.getEntity(resource)

		const record = await Entity.findOneOrFail(filterOrId, { relations: ['file'] }).catch(() => {
			throw new NotFoundException()
		})

		await Entity.remove(record)

		if (record.file?.fileId) {
			await this.fileService.delete(resource, record.file.fileId)
			const FileEntity: any = this.getEntity('files')
			FileEntity.remove(record.file)
		}
	}
}
