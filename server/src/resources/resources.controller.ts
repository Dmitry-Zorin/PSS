import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import { CreateDto, FindOneDto, FindDto, UpdateDto } from './dto'
import { RemoveDto } from './dto/remove.dto'
import { ResourceValidationPipe } from './resource-validation.pipe'
import { ResourcesService } from './resources.service'

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(new HttpExceptionFilter())
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('get_count')
	async handleGetCount() {
		return this.resourcesService.getCount()
	}

	@MessagePattern('get_categories')
	async handleGetCategories() {
		return this.resourcesService.getCategories()
	}

	@MessagePattern('create')
	async handleCreate(@Payload(new ResourceValidationPipe()) { resource, payload }: CreateDto) {
		const id = await this.resourcesService.create(resource, payload)
		return { id }
	}

	@MessagePattern('find')
	async handleFindList({ resource, query }: FindDto) {
		if (query.ids) {
			const records = await this.resourcesService.findMany(resource, query.ids)
			return { records }
		}
		const { records, total } = await this.resourcesService.findList(resource, query)
		const range = this.resourcesService.getRange(resource, total, query)
		return { records, range }
	}

	@MessagePattern('find_one')
	handleFindOne({ resource, id }: FindOneDto) {
		return this.resourcesService.findOne(resource, id)
	}

	@MessagePattern('update')
	handleUpdate({ resource, id, payload }: UpdateDto) {
		return this.resourcesService.update(resource, id, payload)
	}

	@MessagePattern('remove')
	handleRemove({ resource, ids }: RemoveDto) {
		return this.resourcesService.remove(resource, ids)
	}

	@MessagePattern('remove-one')
	handleRemoveOne({ resource, id }: FindOneDto) {
		return this.resourcesService.removeOne(resource, id)
	}
}
