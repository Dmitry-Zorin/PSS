import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager, In } from 'typeorm'
import { FindListParamsDto } from '../dto/find.dto'
import { Author, Character } from '../entities'

@Injectable()
export class OtherResourcesService {
	static readonly availableEntities = {
		authors: Author,
		characters: Character,
	} as const

	constructor(
		@InjectEntityManager('resourcesConnection')
		private readonly entityManager: EntityManager,
	) {}

	private static getEntityClass(resource: string) {
		type AvailableResource = keyof typeof OtherResourcesService['availableEntities']
		return OtherResourcesService.availableEntities[resource as AvailableResource]
	}

	async create(resource: string, payload: Record<string, any>) {
		const entityClass = OtherResourcesService.getEntityClass(resource)
		const createResult = await this.entityManager.insert(entityClass, payload)
		return {
			id: createResult.identifiers[0],
			...payload
		}
	}

	async update(resource: string, id: string, payload: Record<string, any>) {
		const entityClass = OtherResourcesService.getEntityClass(resource)

		const [entity] = await this.entityManager.find(entityClass, {
			where: { id },
		})

		if (!entity) {
			throw new NotFoundException()
		}

		await this.entityManager.update(entityClass, this.entityManager.getId(entity), payload)

		return null
	}

	async find(resource: string, params: FindListParamsDto, count?: boolean) {
		const entityClass = OtherResourcesService.getEntityClass(resource)
		const { filter = {}, sort, skip, take } = params

		const options = {
			where: filter,
			...sort && {
				order: { [sort.field]: sort.order },
			},
			skip,
			take,
		}

		try {
			return {
				records: await this.entityManager.find(entityClass, options),
				...count && {
					total: await this.entityManager.count(entityClass, options),
				},
			}
		}
		catch (e: any) {
			throw new BadRequestException(e.message)
		}
	}

	async remove(resource: string, ids: string[]) {
		const entityClass = OtherResourcesService.getEntityClass(resource)
		await this.entityManager.delete(entityClass, ids)
		return [null]
	}
}
