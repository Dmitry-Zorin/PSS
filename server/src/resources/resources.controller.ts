import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import { CreateDto, FindDto, FindOneDto, UpdateDto } from './dto'
import { IdDto } from './dto/params/id.dto'
import { RemoveDto } from './dto/remove.dto'
import { PayloadValidationPipe } from './payload-validation.pipe'
import { ResourcesService } from './resources.service'
import { omitNullDeep } from './utilities'

@Controller()
@UsePipes(new ValidationPipe({
	whitelist: true,
	forbidNonWhitelisted: true,
	transform: true
}))
@UseFilters(HttpExceptionFilter)
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('count')
	handleGetCount() {
		return this.resourcesService.getCount()
	}

	@MessagePattern('categories')
	handleGetCategories() {
		return this.resourcesService.getCategories()
	}

	@MessagePattern('author_publications')
	async handleGetAuthorPublications({ id }: IdDto) {
		const publications = await this.resourcesService.getAuthorPublications(id)
		return omitNullDeep(publications)
	}

	@MessagePattern('create')
	async handleCreate(@Payload(PayloadValidationPipe) { resource, payload }: CreateDto) {
		const created = await this.resourcesService.create(resource, payload)
		return omitNullDeep(created)
	}

	@MessagePattern('update')
	async handleUpdate(@Payload(PayloadValidationPipe) { resource, id, payload }: UpdateDto) {
		await this.resourcesService.update(resource, id, payload)
		return null
	}

	@MessagePattern('find')
	async handleFind({ resource, query }: FindDto) {
		if (query.ids) {
			return await this.resourcesService.findByIds(resource, query.ids)
		}
		const { records, total } = await this.resourcesService.find(resource, query, {
			count: true,
		})
		const { skip = 0, take = total } = query
		return {
			records,
			range: `${resource} ${skip}-${Math.min(take, total)}/${total}`,
		}
	}

	@MessagePattern('find_one')
	async handleFindOne({ resource, id }: FindOneDto) {
		return this.resourcesService.findOne(resource, id)
	}

	@MessagePattern('remove')
	async handleRemove({ resource, ids }: RemoveDto) {
		await this.resourcesService.remove(resource, ids)
		return null
	}

	@MessagePattern('remove_one')
	async handleRemoveOne({ resource, id }: FindOneDto) {
		await this.resourcesService.remove(resource, [id])
		return null
	}
}
