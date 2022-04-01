import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import { CreateResourceDto, FindResourceDto, FindResourcesDto, RemoveResourceDto, UpdateResourceDto } from './dto'
import { ListParamsPipe, PaginationOptions } from './list-params.pipe'
import { ResourcesService } from './resources.service'

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(new HttpExceptionFilter())
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('count_all')
	async handleCountAll() {
		return this.resourcesService.countAll()
	}

	@MessagePattern('create')
	async handleCreate({ resource, payload }: CreateResourceDto) {
		const id = await this.resourcesService.create(resource, payload)
		return { id }
	}

	@MessagePattern('find_all')
	async handleFindAll(
		@Payload() { resource }: FindResourcesDto,
		@Payload(new ListParamsPipe()) listParams: PaginationOptions,
	) {
		const { documents, total } = await this.resourcesService.findAll(resource, listParams)
		const range = this.resourcesService.getRange(resource, total, listParams)
		return { documents, range }
	}

	@MessagePattern('find_one')
	handleFindOne({ resource, id }: FindResourceDto) {
		return this.resourcesService.findOne(resource, id)
	}

	@MessagePattern('update')
	handleUpdate({ resource, id, payload }: UpdateResourceDto) {
		return this.resourcesService.update(resource, id, payload)
	}

	@MessagePattern('remove')
	handleRemove({ resource, id }: RemoveResourceDto) {
		return this.resourcesService.remove(resource, id)
	}
}
