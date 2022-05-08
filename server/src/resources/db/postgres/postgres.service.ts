import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { capitalize, isPlainObject } from 'lodash'
import { mapValues } from 'lodash/fp'
import { plural, singular } from 'pluralize'
import { BaseEntity, EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm'
import { FindListParamsDto } from '../../dto/find.dto'
import { DbService } from '../db.service'
import { File, Publication, ResourceItem, Resource } from './entities'
import * as entities from './entities'

type Entity = typeof ResourceItem

interface CreatePayload extends Record<string, any> {
	fileInfo?: {
		fileId: string
		name: string
	}
}

interface ResourceInfo {
	Entity: Entity,
	resourceName?: string
}

const omitNullDeep = mapValues((e: any): any => (
	isPlainObject(e) || e instanceof BaseEntity ? omitNullDeep(e) : e ?? undefined
))

@Injectable()
export class PostgresService extends DbService {
	constructor(
		@InjectEntityManager('resourcesConnection')
		private readonly entityManager: EntityManager,
	) {
		super()
	}

	private static getInfo(resource: string): ResourceInfo {
		const resourceName = singular(resource)
		const entityName = capitalize(resourceName)
		const Entity = (entities as unknown as Record<string, Entity>)[entityName]

		if (Entity) {
			return { Entity }
		}

		return {
			Entity: ResourceItem,
			resourceName,
		}
	}

	async getCount() {
		const itemsCount = await ResourceItem
			.createQueryBuilder('item')
			.select('item.resourceName', 'resourceName')
			.addSelect('count(*)')
			.groupBy('item.resourceName')
			.getRawMany()

		return itemsCount.reduce((res, e) => {
			res[plural(e.resourceName)] = +e.count
			return res
		}, {})
	}

	async getCategories() {
		const categories = await Resource
			.createQueryBuilder('resource')
			.select('resource.category', 'category')
			.addSelect('array_agg(resource.name)', 'resources')
			.groupBy('resource.category')
			.getRawMany()

		return categories.reduce((res, e) => {
			res[e.category] = e.resources.map(plural)
			return res
		}, {})
	}

	async createOne(resource: string, payload: CreatePayload) {
		const resourceInfo = PostgresService.getInfo(resource)
		const { Entity, resourceName } = resourceInfo
		const { fileInfo, title, description, ...other } = payload

		const entity: Record<string, any> = {
			title,
			description,
		}

		return this.entityManager.transaction(async (manager) => {
			if (resourceName) {
				entity.resourceName = resourceName

				const publication = await Resource.findOneBy({
					name: resourceName,
				})

				if (publication?.category) {
					const { authorIds, ...props } = other
					try {
						entity.publication = await manager.save(Publication, {
							title,
							authors: authorIds.map((id: string) => ({ id })),
							...props,
						})
					}
					catch {
						throw new BadRequestException('Invalid author IDs')
					}
				}
				else {
					Object.assign(entity, other)
				}
			}
			else {
				Object.assign(entity, other)
			}

			if (fileInfo) {
				entity.file = await manager.save(File, fileInfo)
			}

			console.log(entity)
			const { id } = await manager.save(Entity, entity)
			return id
		})
	}

	async findList(resource: string, listParams: FindListParamsDto) {
		const resourceInfo = PostgresService.getInfo(resource)
		const { Entity, resourceName } = resourceInfo
		const { match, sort, skip, limit } = listParams

		const options: FindManyOptions = {
			order: sort,
			take: limit,
			skip,
		}

		if (resourceName && resource !== 'timeline') {
			options.where = { ...match, resourceName }
			options.relations = { publication: true }
		}
		else {
			options.where = match
		}

		try {
			const [records, total] = await Entity.findAndCount(options)
			return {
				records: records.map(omitNullDeep),
				total,
			}
		}
		catch (e: any) {
			throw new BadRequestException(e.message)
		}
	}

	async findMany(resource: string, ids: string[]) {
		const resourceInfo = PostgresService.getInfo(resource)
		const { Entity, resourceName } = resourceInfo

		const where: FindOptionsWhere<any> = ids.map(id => ({ id }))

		if (resourceName) {
			where.resourceName = resourceName
		}

		try {
			const records = await Entity.findBy(where)
			return records.map(omitNullDeep)
		}
		catch (e: any) {
			throw new BadRequestException(e.message)
		}
	}

	async findOne(resource: string, id: string) {
		const resourceInfo = PostgresService.getInfo(resource)
		const { Entity, resourceName } = resourceInfo

		const options: FindOneOptions = {
			loadRelationIds: false,
		}
		const filter = { id }

		if (resourceName) {
			options.where = { ...filter, resourceName }
			options.relations = {
				publication: true,
				file: true,
			}
		}
		else {
			options.where = filter
		}

		const entity = await Entity.findOneOrFail(options).catch(() => {
			throw new NotFoundException()
		})

		return omitNullDeep(entity)
	}

	async updateOne(resource: string, id: string, update: any) {
		const resourceInfo = PostgresService.getInfo(resource)
		const { Entity, resourceName } = resourceInfo
		const { fileInfo, title, description, ...other } = update

		const options: FindOneOptions = {
			where: { id },
		}

		if (resourceName) {
			options.relations = {
				publication: true,
				file: !!fileInfo,
			}
		}

		const entity = await Entity.findOneOrFail(options).catch(() => {
			throw new NotFoundException()
		})

		const { publication, file } = entity
		const prevFileId = file?.fileId || ''

		await this.entityManager.transaction(async (manager) => {
			if (publication?.id) {
				const { authorIds, ...props } = other

				if (publication.authorIds.some((id: any) => authorIds.includes(id.toString()))) {
					await manager
						.createQueryBuilder()
						.relation(Publication, 'authors')
						.of(publication)
						.remove(publication.authorIds)
				}

				Publication.merge(publication, {
					title,
					authors: authorIds.map((id: string) => ({ id })),
					...props,
				})

				try {
					entity.publication = await manager.save(publication)
				}
				catch {
					throw new BadRequestException('Invalid author IDs')
				}
			}
			else {
				Entity.merge(entity, other)
			}

			if (fileInfo) {
				File.merge(file, fileInfo)
				entity.file = await manager.save(file)
			}

			Entity.merge(entity, { title, description })
			await manager.save(entity)
		})

		return fileInfo ? prevFileId : ''
	}

	async delete(resource: string, ids: string[]) {
		const resourceInfo = PostgresService.getInfo(resource)
		const { Entity, resourceName } = resourceInfo

		const entities = await Entity.find({
			where: ids.map(id => ({ id })),
			relations: {
				...resourceName && {
					file: true,
				},
			},
			loadRelationIds: {
				relations: ['publication'],
				disableMixedMap: true,
			},
		})

		if (resourceName) {
			await this.entityManager.transaction(async (manager) => {
				const fileIds = entities
					.filter(e => e.file?.id)
					.map(e => e.file!.id)

				if (fileIds.length) {
					await manager.delete(File, fileIds)
				}

				const publicationIds = entities
					.filter(e => e.publication?.id)
					.map(e => e.publication!.id)

				if (publicationIds.length) {
					await manager.delete(Publication, publicationIds)
				}

				await manager.delete(ResourceItem, ids)
			})
		}
		else {
			await Entity.delete(ids)
		}

		return entities
			.filter(e => e.file?.fileId)
			.map(e => e.file!.fileId)
	}

	async deleteOne(resource: string, id: string) {
		const [fileId] = await this.delete(resource, [id])
		return fileId || ''
	}
}
