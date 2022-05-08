import { Injectable } from '@nestjs/common'
import { DbService } from './db/db.service'
import { FindListParamsDto } from './dto/find.dto'

@Injectable()
export class ResourcesService {
	constructor(private readonly dbService: DbService) {}

	getCount() {
		return this.dbService.getCount()
	}

	getCategories() {
		return this.dbService.getCategories()
	}

	create(resource: string, payload: any) {
		return this.dbService.createOne(resource, payload)
	}

	findMany(resource: string, ids: string[]) {
		return this.dbService.findMany(resource, ids)
	}

	findList(resource: string, listParams: FindListParamsDto) {
		return this.dbService.findList(resource, listParams)
	}

	getRange(resource: string, total: number, listParams: FindListParamsDto) {
		const { skip = 0, limit = total } = listParams
		return `${resource} ${skip}-${Math.min(limit, total)}/${total}`
	}

	findOne(resource: string, id: string) {
		return this.dbService.findOne(resource, id)
	}

	update(resource: string, id: string, payload: any) {
		return this.dbService.updateOne(resource, id, payload)
	}

	remove(resource: string, ids: string[]) {
		return this.dbService.delete(resource, ids)
	}

	async removeOne(resource: string, id: string) {
		const [fileId] = await this.dbService.delete(resource, [id])
		return fileId || ''
	}
}
