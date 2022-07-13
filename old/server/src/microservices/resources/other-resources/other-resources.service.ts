import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { CONNECTION_NAME } from '../constants'
import { Author, Character } from '../entities'

export type AvailableEntities =
	typeof OtherResourcesService['availableEntities']

@Injectable()
export class OtherResourcesService {
	static readonly availableEntities = {
		authors: Author,
		characters: Character,
	}

	constructor(
		@InjectEntityManager(CONNECTION_NAME)
		private readonly entityManager: EntityManager,
	) {}

	static getEntityClass(resource: string) {
		return OtherResourcesService.availableEntities[
			resource as keyof AvailableEntities
		]
	}

	async create(resource: string, payload: Record<string, any>) {
		const entityClass = OtherResourcesService.getEntityClass(resource)
		const createResult = await this.entityManager.insert(entityClass, payload)
		return {
			id: createResult.identifiers[0],
			...payload,
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

		await this.entityManager.update(
			entityClass,
			this.entityManager.getId(entity),
			payload,
		)

		return null
	}

	getFindOptions() {
		return {}
	}

	async remove(resource: string, ids: string[]) {
		const entityClass = OtherResourcesService.getEntityClass(resource)
		await this.entityManager.delete(entityClass, ids)
	}
}
