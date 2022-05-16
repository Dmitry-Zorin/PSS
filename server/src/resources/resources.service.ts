import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager, In } from 'typeorm'
import { FindListParamsDto } from './dto/find.dto'
import { Publication, Resource, ResourceItem } from './entities'
import { AvailableEntities, OtherResourcesService } from './other-resources/otherResources.service'
import { ResourceItemService } from './resource-item/resourceItem.service'
import { omitNullDeep } from './utilities'

export interface FindOptions {
	count?: boolean
}

export interface FindResult {
	records: Record<string, any>[]
}

export interface CountResult {
	total: number
}

@Injectable()
export class ResourcesService {
	private entityClass: typeof ResourceItem | AvailableEntities[keyof AvailableEntities]

	constructor(
		@InjectEntityManager('resourcesConnection')
		private readonly entityManager: EntityManager,
		private readonly resourceItemService: ResourceItemService,
		private readonly otherResourcesService: OtherResourcesService,
	) {}

	private getResourceService(resource: string) {
		if (resource in OtherResourcesService.availableEntities) {
			this.entityClass = OtherResourcesService.getEntityClass(resource)
			return this.otherResourcesService
		}
		this.entityClass = ResourceItem
		return this.resourceItemService
	}

	async getCount() {
		const resourceItems = await this.entityManager
			.createQueryBuilder(ResourceItem, 'item')
			.select('item.resource', 'resource')
			.addSelect('count(*)', 'count')
			.groupBy('item.resource')
			.getRawMany()

		return resourceItems.reduce((res: Record<string, number>, e) => {
			res[e.resource] = +e.count
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
			res[e.category] = e.resources
			return res
		}, {})
	}

	getTimeline() {
		// TODO
	}

	async getAuthorPublications(id: string) {
		const publications = await this.entityManager.find(Publication, {
			where: {
				authors: { id },
			},
		})
		if (!publications.length) {
			throw new NotFoundException('Author with the provided ID does not have any publications')
		}
		return publications
	}

	create(resource: string, payload: any) {
		return this.getResourceService(resource).create(resource, payload)
	}

	update(resource: string, id: string, payload: any) {
		return this.getResourceService(resource).update(resource, id, payload)
	}

	find(resource: string, searchParams: FindListParamsDto, options: FindOptions & { count: true }): Promise<FindResult & CountResult>
	find(resource: string, searchParams: FindListParamsDto, options?: FindOptions): Promise<FindResult>
	async find(resource: string, searchParams: FindListParamsDto, options = {} as FindOptions): Promise<any> {
		const { filter, sort, skip, take } = searchParams
		const resourceService = this.getResourceService(resource)
		const additionalFindOptions = resourceService.getFindOptions(resource, searchParams)

		const findOptions = {
			where: filter,
			order: {
				...sort && {
					[sort.field]: sort.order,
				},
			},
			skip,
			take,
			...additionalFindOptions,
		}

		try {
			if (options.count) {
				const [records, total] = await this.entityManager.findAndCount(this.entityClass, findOptions)
				return {
					records: omitNullDeep(records),
					total,
				}
			}
			const records = await this.entityManager.find(this.entityClass, findOptions)
			return {
				records: omitNullDeep(records),
			}
		}
		catch (e: any) {
			throw new BadRequestException(e.message)
		}
	}

	findByIds(resource: string, ids: string[]) {
		return this.find(resource, {
			filter: {
				id: In(ids),
			},
		})
	}

	async findOne(resource: string, id: string) {
		const { records } = await this.find(resource, {
			filter: { id },
		})
		if (!records.length) {
			throw new NotFoundException()
		}
		return records[0]
	}

	remove(resource: string, ids: string[]) {
		return this.getResourceService(resource).remove(resource, ids)
	}
}
