import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { difference } from 'lodash'
import { EntityManager, FindManyOptions, In, Repository } from 'typeorm'
import { FindListParamsDto } from '../dto/find.dto'
import { File, Publication, Resource, ResourceItem } from '../entities'

@Injectable()
export class ResourceItemService {
	private readonly entityManager: EntityManager

	constructor(
		@InjectRepository(ResourceItem, 'resourcesConnection')
		private readonly resourceItems: Repository<ResourceItem>,
	) {
		this.entityManager = this.resourceItems.manager
	}

	async create(resource: string, payload: any) {
		const { file, publication, ...resourceItem } = payload

		const [resourceInfo] = await this.entityManager.findBy(Resource, {
			name: resource,
		})

		if (!resourceInfo) {
			throw new NotFoundException(`Resource ${resource} does not exist`)
		}

		return this.entityManager.transaction(async (manager) => {
			if (resourceInfo?.category) {
				if (!publication?.authorIds) {
					throw new BadRequestException('Parameter publication.authorIds is required')
				}

				publication.title = resourceItem.title
				publication.authors = publication.authorIds.map((id: string) => ({ id }))

				try {
					resourceItem.publication = await manager.save(Publication, publication)
				}
				catch {
					throw new BadRequestException('Publication has invalid format')
				}
			}

			if (file) {
				resourceItem.file = await manager.save(File, file)
			}

			resourceItem.resource = resource
			return manager.save(ResourceItem, resourceItem)
		})
	}

	async update(resource: string, id: string, payload: any) {
		const { publication, file, ...resourceItemUpdate } = payload

		const [resourceItem] = await this.resourceItems.find({
			where: { id },
			relations: {
				publication: !!publication,
				file: !!file,
			},
		})

		if (!resourceItem) {
			throw new NotFoundException()
		}

		await this.entityManager.transaction(async (manager) => {
			if (publication && resourceItem.publication) {
				await manager
					.createQueryBuilder()
					.relation(Publication, 'authors')
					.of(resourceItem.publication)
					.addAndRemove(
						difference(publication.authorIds, resourceItem.publication.authorIds),
						difference(resourceItem.publication.authorIds, publication.authorIds),
					)

				publication.title = resourceItemUpdate.title
				delete publication.authorIds

				try {
					await manager.update(Publication, resourceItem.publication.id, publication)
				}
				catch (e: any) {
					throw new BadRequestException('Publication has invalid format')
				}
			}

			if (file && resourceItem.file) {
				await manager.update(File, resourceItem.file.id, file)
			}

			resourceItemUpdate.resource = resource

			try {
				await manager.update(ResourceItem, resourceItem.id, resourceItemUpdate)
			}
			catch (e: any) {
				throw new BadRequestException(e.message)
			}
		})

		return resourceItem.file?.fileId || null
	}

	async find(resource: string, params: FindListParamsDto, count?: boolean) {
		const { filter = {}, sort, skip, take } = params

		const options: FindManyOptions = {
			...sort && {
				order: { [sort.field]: sort.order },
			},
			skip,
			take,
		}

		if (resource !== 'timeline') {
			filter.resource = resource
			options.relations = {
				publication: true,
				file: Object.keys(filter).toString() === 'id',
			}
		}

		options.where = filter

		try {
			return {
				records: await this.resourceItems.find(options),
				...count && {
					total: await this.resourceItems.count(options),
				},
			}
		}
		catch (e: any) {
			throw new BadRequestException(e.message)
		}
	}

	async remove(resource: string, ids: string[]) {
		const entities = await this.resourceItems.find({
			where: {
				id: In(ids),
			},
			relations: {
				file: true,
			},
			loadRelationIds: {
				relations: ['publication'],
				disableMixedMap: true,
			},
		})

		if (!entities.length) {
			throw new NotFoundException('Resource items with the provided IDs do not exist')
		}

		const fileIds = entities.map(e => e.file?.id).filter(e => e)
		const publicationIds = entities.map(e => e.publication?.id).filter(e => e)

		await this.entityManager.transaction(async (manager) => {
			if (fileIds.length) {
				await manager.delete(File, fileIds)
			}
			if (publicationIds.length) {
				await manager.delete(Publication, publicationIds)
			}
			await manager.delete(ResourceItem, ids)
		})

		return entities.map(e => e.file?.fileId || null)
	}
}
