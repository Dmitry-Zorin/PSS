import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import { CreateDto, FindOneDto, FindListDto, RemoveDto, UpdateDto } from './dto'
import { FindManyDto } from './dto/find-many.dto'
import { ResourceValidationPipe } from './resource-validation.pipe'
import { ResourcesService } from './resources.service'

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true }))
@UseFilters(new HttpExceptionFilter())
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('count')
	async handleCount() {
		return this.resourcesService.count()
	}

	@MessagePattern('create')
	async handleCreate(@Payload(new ResourceValidationPipe()) { resource, payload }: CreateDto) {
		const id = await this.resourcesService.create(resource, payload)
		return { id }
	}

	@MessagePattern('find')
	async handleFindList({ resource, query }: FindListDto | FindManyDto) {
		if ('ids' in query) {
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
	handleRemove({ resource, id }: RemoveDto) {
		return this.resourcesService.remove(resource, id)
	}
}
