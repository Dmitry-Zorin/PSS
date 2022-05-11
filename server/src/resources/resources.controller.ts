import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import { CreateDto, FindDto, FindOneDto, UpdateDto } from './dto'
import { RemoveDto } from './dto/remove.dto'
import { PayloadValidationPipe } from './payload-validation.pipe'
import { ResourcesService } from './resources.service'

@Controller()
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('create')
	async handleCreate(@Payload(PayloadValidationPipe) { resource, payload }: CreateDto) {
		return this.resourcesService.create(resource, payload)
	}

	@MessagePattern('update')
	handleUpdate(@Payload(PayloadValidationPipe) { resource, id, payload }: UpdateDto) {
		return this.resourcesService.update(resource, id, payload)
	}

	@MessagePattern('find')
	async handleFind({ resource, query }: FindDto) {
		if (query.ids) {
			return this.resourcesService.findByIds(resource, query.ids)
		}
		const { records, total } = await this.resourcesService.find(resource, query, true)
		const { skip = 0, take = total } = query
		return {
			records,
			range: `${resource} ${skip}-${Math.min(take, total)}/${total}`,
		}
	}

	@MessagePattern('find_one')
	async handleFindOne({ resource, id }: FindOneDto) {
		const { records } = await this.resourcesService.find(resource, {
			filter: { id },
		})
		return records[0]
	}

	@MessagePattern('remove')
	handleRemove({ resource, ids }: RemoveDto) {
		return this.resourcesService.remove(resource, ids)
	}

	@MessagePattern('remove_one')
	async handleRemoveOne({ resource, id }: FindOneDto) {
		const [fileId] = await this.resourcesService.remove(resource, [id])
		return fileId || ''
	}

	@MessagePattern('get_count')
	handleGetCount() {
		return this.resourcesService.getCount()
	}

	@MessagePattern('get_categories')
	handleGetCategories() {
		return this.resourcesService.getCategories()
	}
}
