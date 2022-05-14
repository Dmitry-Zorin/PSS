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
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('get_count')
	handleGetCount() {
		return this.resourcesService.getCount()
	}

	@MessagePattern('get_categories')
	handleGetCategories() {
		return this.resourcesService.getCategories()
	}

	@MessagePattern('get_author_publications')
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
			records: omitNullDeep(records),
			range: `${resource} ${skip}-${Math.min(take, total)}/${total}`,
		}
	}

	@MessagePattern('find_one')
	async handleFindOne({ resource, id }: FindOneDto) {
		const { records } = await this.resourcesService.findByIds(resource, [id])
		return omitNullDeep(records[0])
	}

	@MessagePattern('remove')
	handleRemove({ resource, ids }: RemoveDto) {
		return this.resourcesService.remove(resource, ids)
	}

	@MessagePattern('remove_one')
	async handleRemoveOne({ resource, id }: FindOneDto) {
		const [fileId] = await this.resourcesService.remove(resource, [id])
		return fileId
	}
}
