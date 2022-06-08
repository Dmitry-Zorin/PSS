import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import {
	EntityManager,
	EntityPropertyNotFoundError,
	FindManyOptions,
	In,
} from 'typeorm'
import { CONNECTION_NAME, DEFAULT_CACHE_TIME } from './constants'
import { FindListParamsDto } from './dto/params/find-query.dto'
import { Publication, Resource, ResourceItem } from './entities'
import { OtherResourcesService } from './other-resources/other-resources.service'
import { ResourceItemService } from './resource-item/resource-item.service'
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
	private readonly logger = new Logger('ResourcesService')

	constructor(
		@InjectEntityManager(CONNECTION_NAME)
		private readonly entityManager: EntityManager,
		private readonly resourceItemService: ResourceItemService,
		private readonly otherResourcesService: OtherResourcesService,
	) {}

	private static getEntityClass(resource: string) {
		if (resource in OtherResourcesService.availableEntities) {
			return OtherResourcesService.getEntityClass(resource)
		}
		return ResourceItem
	}

	private getResourceService(resource: string) {
		if (resource in OtherResourcesService.availableEntities) {
			return this.otherResourcesService
		}
		return this.resourceItemService
	}

	async getCount() {
		const resourceItems = await this.entityManager
			.createQueryBuilder(ResourceItem, 'item')
			.select('item.resource', 'resource')
			.addSelect('count(*)', 'count')
			.groupBy('item.resource')
			.cache(DEFAULT_CACHE_TIME)
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
			.cache(10 * DEFAULT_CACHE_TIME)
			.getRawMany()

		return categories.reduce((res: Record<string, string[]>, e) => {
			res[e.category] = e.resources
			return res
		}, {})
	}

	async getPublications(filter: Record<string, any>) {
		const publications = await this.entityManager.find(Publication, {
			where: filter,
		})
		if (!publications.length) {
			throw new NotFoundException(
				'Author with the provided ID does not have any publications',
			)
		}
		return publications
	}

	create(resource: string, payload: any) {
		return this.getResourceService(resource).create(resource, payload)
	}

	update(resource: string, id: string, payload: any) {
		return this.getResourceService(resource).update(resource, id, payload)
	}

	find(
		resource: string,
		searchParams: FindListParamsDto,
		options: FindOptions & { count: true },
	): Promise<FindResult & CountResult>
	find(
		resource: string,
		searchParams: FindListParamsDto,
		options?: FindOptions,
	): Promise<FindResult>
	async find(
		resource: string,
		searchParams: FindListParamsDto,
		options = {} as FindOptions,
	): Promise<any> {
		const { filter, sort, skip, take } = searchParams
		const findOptions: FindManyOptions = {
			skip,
			take,
			cache: DEFAULT_CACHE_TIME,
		}

		if (resource === 'timeline') {
			findOptions.order = { createdAt: 'desc' }
		} else {
			findOptions.where = filter

			if (sort) {
				findOptions.order = {
					[sort.field]: sort.order,
				}
			}

			const resourceService = this.getResourceService(resource)
			const additionalOptions = resourceService.getFindOptions(
				resource,
				searchParams,
			)
			Object.assign(findOptions, additionalOptions)
		}

		const entityClass = ResourcesService.getEntityClass(resource)

		try {
			if (options.count) {
				const [records, total] = await this.entityManager.findAndCount(
					entityClass,
					findOptions,
				)
				return {
					records: omitNullDeep(records),
					total,
				}
			}

			const records = await this.entityManager.find(entityClass, findOptions)
			return {
				records: omitNullDeep(records),
			}
		} catch (e: any) {
			if (e instanceof EntityPropertyNotFoundError) {
				const property = e.message.match(/^Property "(\w+)"/)![1]
				throw new BadRequestException(`Invalid property ${property}`)
			}
			this.logger.error(e, e?.stack)
			throw new NotFoundException()
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
