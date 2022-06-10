import {
	Controller,
	UseFilters,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import {
	FindQueryDto,
	IdParamDto,
	IdsParamDto,
	PayloadDto,
	ResourceParamDto,
} from './dto/params'
import { PublicationsQueryDto } from './dto/params/publications-query.dto'
import { PayloadValidationPipe } from './payload-validation.pipe'
import { ResourcesService } from './resources.service'
import { omitNullDeep } from './utilities'

@Controller()
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('count')
	getCount() {
		return this.resourcesService.getCount()
	}

	@MessagePattern('categories')
	getCategories() {
		return this.resourcesService.getCategories()
	}

	@MessagePattern('publications')
	async getAuthorPublications(
		@Payload('query') { authorId }: PublicationsQueryDto,
	) {
		const publications = await this.resourcesService.getPublications({
			authors: {
				id: authorId,
			},
		})
		return omitNullDeep(publications)
	}

	@MessagePattern('create')
	async create(
		@Payload() { resource }: ResourceParamDto,
		@Payload(PayloadValidationPipe) payload: PayloadDto,
	) {
		const created = await this.resourcesService.create(resource, payload)
		return omitNullDeep(created)
	}

	@MessagePattern('update')
	async update(
		@Payload() { resource }: ResourceParamDto,
		@Payload() { id }: IdParamDto,
		@Payload(PayloadValidationPipe) payload: PayloadDto,
	) {
		await this.resourcesService.update(resource, id, payload)
		return null
	}

	@MessagePattern('find')
	async find(
		@Payload() { resource }: ResourceParamDto,
		@Payload('query') query: FindQueryDto,
	) {
		if (query.ids) {
			return await this.resourcesService.findByIds(resource, query.ids)
		}
		const { records, total } = await this.resourcesService.find(
			resource,
			query,
			{ count: true },
		)
		const { skip = 0, take = total } = query
		return {
			records,
			range: `${resource} ${skip}-${Math.min(take, total)}/${total}`,
		}
	}

	@MessagePattern('find_one')
	async findOne(
		@Payload() { resource }: ResourceParamDto,
		@Payload() { id }: IdParamDto,
	) {
		return this.resourcesService.findOne(resource, id)
	}

	@MessagePattern('remove')
	async remove(
		@Payload() { resource }: ResourceParamDto,
		@Payload() { ids }: IdsParamDto,
	) {
		await this.resourcesService.remove(resource, ids)
		return null
	}

	@MessagePattern('remove_one')
	async removeOne(
		@Payload() { resource }: ResourceParamDto,
		@Payload() { id }: IdParamDto,
	) {
		await this.resourcesService.remove(resource, [id])
		return null
	}
}
