import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { capitalize, isPlainObject, isString } from 'lodash'
import { mapValues } from 'lodash/fp'
import { plural, singular } from 'pluralize'
import { BaseEntity, FindOptionsWhere } from 'typeorm'
import { PaginationOptions } from '../../list-params.pipe'
import { DbService, DeleteResult, FindOneResult, Role, UpdateResult } from '../db.service'
import { File, Publication, ResourceItem } from './entities'
import * as adminEntities from './entities/admin'
import { Resource } from './entities/admin'

type Entity = typeof ResourceItem

interface CreatePayload extends Record<string, any> {
	fileInfo?: {
		fileId: string
		name: string
	}
}

interface ResourceInfo {
	Entity: Entity,
	isUserResource: boolean,
	resourceName: string
}

type Filter = FindOptionsWhere<any>
type FilterOrId = Filter | string

const omitNullDeep = mapValues((e: any): any => (
	isPlainObject(e) || e instanceof BaseEntity ? omitNullDeep(e) : e ?? undefined
))

@Injectable()
export class PostgresService extends DbService {
	private static getResourceInfo(resource: string, role = Role.Admin): ResourceInfo {
		const resourceName = singular(resource)
		const entityName = capitalize(resourceName)
		const adminEntity = (adminEntities as unknown as Record<string, Entity>)[entityName]

		if (!adminEntity) {
			return {
				Entity: ResourceItem,
				isUserResource: true,
				resourceName,
			}
		}

		if (role !== Role.Admin) {
			throw new ForbiddenException()
		}

		return {
			Entity: adminEntity,
			isUserResource: false,
			resourceName,
		}
	}

	private static getFilter(filterOrId: FilterOrId) {
		return isString(filterOrId) ? { id: filterOrId } : filterOrId
	}

	async getResourcesCount() {
		const itemsCount = await ResourceItem
			.createQueryBuilder('item')
			.select('item.resourceName')
			.addSelect('count(*)')
			.groupBy('item.resourceName')
			.getRawMany()

		return itemsCount.reduce((res, e) => {
			res[plural(e.item_resourceName)] = +e.count
			return res
		}, {})
	}

	async create(resource: string, payload: CreatePayload) {
		const resourceInfo = PostgresService.getResourceInfo(resource)
		const { Entity, isUserResource, resourceName } = resourceInfo
		const { fileInfo, title, description, ...other } = payload

		const entity: Record<string, any> = {
			title,
			description,
			...isUserResource && {
				resourceName,
			},
			file: fileInfo,
		}

		if (isUserResource) {
			const publication = await Resource.findOneBy({
				name: resourceName,
			})

			if (publication?.category) {
				entity.publication = { title, ...other }
			}
			else {
				Object.assign(entity, other)
			}
		}
		else {
			Object.assign(entity, other)
		}

		const { id } = await Entity.save(entity)
		return id
	}

	async findAll(resource: string, options: PaginationOptions, role: Role) {
		const resourceInfo = PostgresService.getResourceInfo(resource)
		const { Entity, isUserResource, resourceName } = resourceInfo
		const { match, sort, skip, limit } = options

		const isTimeline = resource === 'timeline'

		try {
			const [records, total] = await Entity.findAndCount({
				...isUserResource && !isTimeline && {
					relations: ['publication'],
				},
				where: {
					...match,
					...isUserResource && !isTimeline && {
						resourceName,
					},
				},
				order: sort,
				take: limit,
				skip,
			})
			return {
				records: records.map(omitNullDeep),
				total,
			}
		}
		catch (e: any) {
			throw new BadRequestException(e.message)
		}
	}

	async findOne(resource: string, filter: any, role: Role): FindOneResult
	async findOne(resource: string, id: string, role: Role): FindOneResult
	async findOne(resource: string, filterOrId: any, role: Role): FindOneResult {
		const resourceInfo = PostgresService.getResourceInfo(resource)
		const { Entity, isUserResource, resourceName } = resourceInfo

		const entity = await Entity.findOneOrFail({
			...isUserResource && {
				relations: ['publication', 'file'],
			},
			where: {
				...PostgresService.getFilter(filterOrId),
				...isUserResource && { resourceName },
			},
		}).catch(() => {
			throw new NotFoundException()
		})

		return omitNullDeep(entity)
	}

	async update(resource: string, filter: any, update: any): UpdateResult
	async update(resource: string, id: string, update: any): UpdateResult
	async update(resource: string, filterOrId: any, update: any): UpdateResult {
		const resourceInfo = PostgresService.getResourceInfo(resource)
		const { Entity, isUserResource } = resourceInfo
		const { fileInfo, title, description, ...other } = update

		const entity = await Entity.findOneOrFail({
			...isUserResource && {
				relations: ['publication', fileInfo && 'file'].filter(Boolean),
			},
			where: PostgresService.getFilter(filterOrId),
		}).catch(() => {
			throw new NotFoundException()
		})

		const prevFileId = entity.file?.fileId || ''

		const newEntity = Entity.merge(entity, {
			title,
			description,
			...!entity.publication?.id ? other : {
				publication: {
					id: entity.publication.id,
					title,
					...other,
				},
			},
			...fileInfo && {
				file: {
					id: entity.file?.id,
					...fileInfo,
				},
			},
		})

		await Entity.save(newEntity)

		return fileInfo ? prevFileId : ''
	}

	async delete(resource: string, filter: any): DeleteResult
	async delete(resource: string, id: string): DeleteResult
	async delete(resource: string, filterOrId: any): DeleteResult {
		const resourceInfo = PostgresService.getResourceInfo(resource)
		const { Entity, isUserResource } = resourceInfo

		const { id, file, publication } = await Entity.findOneOrFail({
			...isUserResource && {
				relations: ['publication', 'file'],
			},
			where: PostgresService.getFilter(filterOrId),
		}).catch(() => {
			throw new NotFoundException()
		})

		if (isUserResource) {
			const manager = ResourceItem.getRepository().manager
			await manager.transaction(async () => {
				if (file) {
					await File.delete(file.id)
				}
				if (publication) {
					await Publication.delete(publication.id)
				}
				await ResourceItem.delete(id)
			})
		}
		else {
			await Entity.delete(id)
		}

		return file?.fileId || ''
	}
}
