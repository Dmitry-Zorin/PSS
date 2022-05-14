import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { DataSource, In } from 'typeorm'
import { FindListParamsDto } from './dto/find.dto'
import { Author, Resource, ResourceItem } from './entities'
import { OtherResourcesService } from './other-resources/otherResources.service'
import { ResourceItemService } from './resource-item/resourceItem.service'

@Injectable()
export class ResourcesService {
	constructor(
		@InjectConnection('resourcesConnection')
		private readonly dataSource: DataSource,
		private readonly resourceItemService: ResourceItemService,
		private readonly otherResourcesService: OtherResourcesService,
	) {}

	private getResourceService(resource: string) {
		return resource in OtherResourcesService.availableEntities
			? this.otherResourcesService
			: this.resourceItemService
	}

	async getCount() {
		const resourceItems = await this.dataSource
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
		const categories = await this.dataSource
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

	async getAuthorPublications(id: string) {
		const [author] = await this.dataSource.manager.find(Author, {
			where: { id },
			relations: {
				publications: true,
			},
		})
		if (!author) {
			throw new NotFoundException('Author with the provided ID does not exist')
		}
		return author.publications
	}

	create(resource: string, payload: any) {
		return this.getResourceService(resource).create(resource, payload)
	}

	update(resource: string, id: string, payload: any) {
		return this.getResourceService(resource).update(resource, id, payload)
	}

	find(resource: string, params: FindListParamsDto, count?: false): Promise<{ records: any[] }>
	find(resource: string, params: FindListParamsDto, count: true): Promise<{ records: any[], total: number }>
	find(resource: string, params: FindListParamsDto, count = false) {
		return this.getResourceService(resource).find(resource, params, count)
	}

	async findByIds(resource: string, ids: string[]) {
		const result = await this.find(resource, {
			filter: {
				id: In(ids)
			},
		})
		if (ids.length === 1 && !result.records.length) {
			throw new NotFoundException()
		}
		return result
	}

	remove(resource: string, ids: string[]) {
		return this.getResourceService(resource).remove(resource, ids)
	}
}
