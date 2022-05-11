import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { capitalize } from 'lodash'
import { mapValues as fpMapValues } from 'lodash/fp'
import { plural, singular } from 'pluralize'
import { EntityManager, FindManyOptions, FindOneOptions, In } from 'typeorm'
import { FindListParamsDto } from './dto/find.dto'
import * as entities from './entities'
import { File, Publication, Resource, ResourceItem } from './entities'

type Entity = typeof ResourceItem | typeof File

const omitNullDeep = fpMapValues((e: any): any => (
	Object.keys(e || {}).length
		? omitNullDeep(e)
		: e ?? undefined
))

@Injectable()
export class ResourcesService {
	constructor(
		@InjectEntityManager('resourcesConnection')
		private readonly entityManager: EntityManager,
	) {}

	private static getEntity(resource: string): Entity {
		const entityName = capitalize(singular(resource))
		return (entities as any)[entityName] || ResourceItem
	}

	create(resource: string, payload: any) {
		const Entity = ResourcesService.getEntity(resource)
		const { publication, file, ...entity } = payload

		return this.entityManager.transaction(async (manager) => {
			if (Entity === ResourceItem) {
				entity.resource = resource

				const [resourceInfo] = await manager.findBy(Resource, {
					name: resource,
				})

				if (resourceInfo?.category) {
					if (!publication) {
						throw new BadRequestException('Parameter authorIds is required')
					}

					const { authorIds, ...otherProps } = publication

					try {
						entity.publication = await manager.save(Publication, {
							title: entity.title,
							authors: authorIds.map((id: string) => ({ id })),
							...otherProps,
						})
					}
					catch {
						throw new BadRequestException('Invalid author IDs')
					}
				}
			}

			if (file) {
				entity.file = await manager.save(File, file)
			}

			return manager.save(Entity, entity)
		})
	}

	async update(resource: string, id: string, payload: any) {
		const Entity = ResourcesService.getEntity(resource)
		const { publication, file, ...newEntity } = payload

		const options: FindOneOptions = {
			where: { id },
		}

		if (Entity === ResourceItem) {
			options.relations = {
				publication: !!publication,
				file: !!file,
			}
			if (!publication || !file) {
				options.loadRelationIds = {
					relations: [
						publication && 'publication',
						file && 'file'
					].filter(Boolean),
					disableMixedMap: true,
				}
			}
		}

		const [entity] = await this.entityManager.find(Entity, options)

		if (!entity) {
			throw new NotFoundException()
		}

		const { publication: oldPublication, file: oldFile } = entity

		await this.entityManager.transaction(async (manager) => {
			if (publication) {
				const { authorIds, ...otherProps } = publication

				if (oldPublication.authorIds.some((id: string) => authorIds.includes(id))) {
					await manager
						.createQueryBuilder()
						.relation(Publication, 'authors')
						.of(publication)
						.remove(publication.authorIds)
				}

				try {
					await manager.save(Publication, {
						id: publication.id,
						title: newEntity.title,
						authors: authorIds.map((id: string) => ({ id })),
						...otherProps,
					})
				}
				catch {
					throw new BadRequestException('Invalid author IDs')
				}
			}

			if (file) {
				file.id = oldFile.id
				await manager.save(File, file)
			}
			else {
				await manager.delete(File, oldFile.id)
			}

			await manager.save(Entity, newEntity)
		})

		return oldFile?.fileId
	}

	async find(resource: string, params: FindListParamsDto, count?: false): Promise<{ records: any[] }>
	async find(resource: string, params: FindListParamsDto, count: true): Promise<{ records: any[], total: number }>
	async find(resource: string, params: FindListParamsDto, count = false) {
		const Entity = ResourcesService.getEntity(resource)
		const { filter = {}, sort, skip, take } = params

		const options: FindManyOptions = {
			...sort && {
				order: { [sort.field]: sort.order },
			},
			skip,
			take,
		}

		if (Entity === ResourceItem && resource !== 'timeline') {
			filter.resource = resource
			options.relations = {
				publication: true,
				file: Object.keys(filter).toString() === 'id',
			}
		}

		options.where = filter

		try {
			const records = await this.entityManager.find(Entity, options)
			return {
				records: records.map(omitNullDeep),
				...count && {
					total: await this.entityManager.count(Entity, options),
				},
			}
		}
		catch (e: any) {
			throw new BadRequestException(e.message)
		}
	}

	async findByIds(resource: string, ids: string[]) {
		return this.find(resource, {
			filter: { id: In(ids) },
		})
	}

	async remove(resource: string, ids: string[]) {
		const Entity = ResourcesService.getEntity(resource)
		const isResourceItem = Entity !== ResourceItem

		const entities = await this.entityManager.find(Entity, {
			where: {
				id: In(ids),
			},
			relations: {
				...isResourceItem && {
					file: true,
				},
			},
			loadRelationIds: {
				relations: ['publication'],
				disableMixedMap: true,
			},
		})

		if (isResourceItem) {
			await this.entityManager.transaction(async (manager) => {
				await manager.delete(File, entities.map(e => e.file?.id).filter(e => e))
				await manager.delete(Publication, entities.map(e => e.publication?.id).filter(e => e))
				await manager.delete(ResourceItem, ids)
			})
		}
		else {
			await this.entityManager.delete(Entity, ids)
		}

		return entities.map(e => e.file?.fileId)
	}

	async getCount() {
		const resourceItems = await this.entityManager
			.createQueryBuilder(ResourceItem, 'item')
			.select('item.resourceName', 'resource')
			.addSelect('count(*)', 'count')
			.groupBy('item.resourceName')
			.getRawMany()

		return resourceItems.reduce((res: Record<string, number>, e) => {
			res[plural(e.resource)] = +e.count
			return res
		}, {})
	}

	async getCategories() {
		const categories = await this.entityManager
			.createQueryBuilder(Resource, 'resource')
			.select('resource.category', 'category')
			.addSelect('array_agg(resource.name)', 'resources')
			.groupBy('resource.category')
			.getRawMany()

		return categories.reduce((res: Record<string, string[]>, e) => {
			res[e.category] = e.resources.map(plural)
			return res
		}, {})
	}
}
