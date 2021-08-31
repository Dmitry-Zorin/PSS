import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { PaginationOptions } from './db/mongo/pipelines/pagination'
import { ListParamsPipe } from './list-params.pipe'
import { ResourcesService } from './resources.service'

@Controller()
export class ResourcesController {
	constructor(private readonly resourcesService: ResourcesService) {}

	@MessagePattern('create')
	async handleCreate({ resource, body, file }: any) {
		return this.resourcesService.create(resource, body, file)
	}

	@MessagePattern('find_all')
	async handleFindAll(
		{ resource }: any,
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
	handleUpdate({ resource, id, body, file }: any) {
		return this.resourcesService.update(resource, id, body, file)
	}

	@MessagePattern('delete')
	handleDelete({ resource, id }: any) {
		return this.resourcesService.remove(resource, id)
	}
}
