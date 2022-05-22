import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { difference, isEmpty } from 'lodash'
import { EntityManager } from 'typeorm'
import { CONNECTION_NAME } from '../constants'
import { FindListParamsDto } from '../dto/params/find-query.dto'
import { Publication, Resource, ResourceItem } from '../entities'

@Injectable()
export class ResourceItemService {
	constructor(
		@InjectEntityManager(CONNECTION_NAME)
		private readonly entityManager: EntityManager,
	) {}

	async create(resource: string, payload: any) {
		const { publication, ...resourceItem } = payload

		const [resourceInfo] = await this.entityManager.findBy(Resource, {
			name: resource,
		})

		if (!resourceInfo) {
			throw new NotFoundException(`Resource ${resource} does not exist`)
		}

		return this.entityManager.transaction(async (manager) => {
			resourceItem.resource = resource
			const { id } = await manager.save(ResourceItem, resourceItem)

			if (resourceInfo?.category) {
				if (!publication) {
					throw new BadRequestException(
						'Parameter publication.authorIds is required',
					)
				}

				publication.resourceItemId = id
				publication.title = resourceItem.title

				try {
					await manager.insert(Publication, publication)
					await manager
						.createQueryBuilder()
						.relation(Publication, 'authors')
						.of(id)
						.add(publication.authorIds)
				} catch (e: any) {
					console.log(e)
					throw new BadRequestException('Publication has invalid format')
				}
			}

			return { id }
		})
	}

	async update(resource: string, id: string, payload: any) {
		const { publication = {}, ...resourceItemUpdate } = payload

		await this.entityManager.transaction(async (manager) => {
			try {
				await manager.update(ResourceItem, id, resourceItemUpdate)
			} catch (e: any) {
				console.log(e)
				throw new BadRequestException('Resource item has invalid format')
			}

			if (publication.authorIds) {
				const relationQueryBuilder = manager
					.createQueryBuilder()
					.relation(Publication, 'authors')
					.of(id)

				const prevAuthors = await relationQueryBuilder.loadMany()
				const prevAuthorIds = prevAuthors.map((e) => e.id)

				await relationQueryBuilder.addAndRemove(
					difference(publication.authorIds, prevAuthorIds),
					difference(prevAuthorIds, publication.authorIds),
				)

				delete publication.authorIds
			}

			if (resourceItemUpdate.title) {
				publication.title = resourceItemUpdate.title
			}

			if (!isEmpty(publication)) {
				try {
					await manager.update(Publication, id, publication)
				} catch (e: any) {
					console.log(e)
					throw new BadRequestException('Publication has invalid format')
				}
			}
		})
	}

	getFindOptions(resource: string, searchParams: FindListParamsDto) {
		return {
			where: {
				...searchParams.filter,
				resource,
			},
			relations: {
				publication: true,
			},
		}
	}

	async remove(resource: string, ids: string[]) {
		await this.entityManager.transaction(async (manager) => {
			await manager.delete(Publication, ids)
			await manager.delete(ResourceItem, ids)
		})
	}
}
