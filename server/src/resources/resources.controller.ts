import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import { ListParamsPipe, PaginationOptions } from './list-params.pipe'
import { ResourcesService } from './resources.service'

@Controller()
@UsePipes(new ValidationPipe())
@UseFilters(new HttpExceptionFilter())
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('create')
	async handleCreate({ resource, payload }: any) {
		const id = await this.resourcesService.create(resource, payload)
		return { id }
	}

	@MessagePattern('count_all')
	async handleCountAll() {
		return this.resourcesService.countAll()
	}

	@MessagePattern('find_all')
	async handleFindAll(
		@Payload() { resource }: any,
		@Payload(new ListParamsPipe()) listParams: PaginationOptions,
	) {
		const { documents, total } = await this.resourcesService.findAll(resource, listParams)
		const range = this.resourcesService.getRange(resource, total, listParams)
		return { documents, range }
	}

	@MessagePattern('find_one')
	async handleFindOne({ resource, id }: any) {
		const record = await this.resourcesService.findOne(resource, id)
		if (record.file) {
			record.file.url = this.resourcesService.getFileUrl(resource, record.file.id)
		}
		return record
	}

	@MessagePattern('update')
	async handleUpdate({ resource, id, payload }: any) {
		await this.resourcesService.update(resource, id, payload)
		return null
	}

	@MessagePattern('remove')
	async handleRemove({ resource, id }: any) {
		await this.resourcesService.remove(resource, id)
		return null
	}
}
