import { Injectable } from '@nestjs/common'
import { DbService } from './db/db.service'
import { ListParams } from './dto/find-list.dto'

@Injectable()
export class ResourcesService {
	constructor(private readonly dbService: DbService) {}

	count() {
		return this.dbService.getResourcesCount()
	}

	create(resource: string, payload: any) {
		return this.dbService.create(resource, payload)
	}

	findList(resource: string, listParams: ListParams) {
		return this.dbService.findList(resource, listParams)
	}

	getRange(resource: string, total: number, listParams: ListParams) {
		const { skip = 0, limit = total } = listParams
		return `${resource} ${skip}-${Math.min(limit, total)}/${total}`
	}

	findMany(resource: string, ids: string[]) {
		return this.dbService.findMany(resource, ids)
	}

	findOne(resource: string, id: string) {
		return this.dbService.findOne(resource, id)
	}

	update(resource: string, id: string, payload: any) {
		return this.dbService.update(resource, id, payload)
	}

	remove(resource: string, id: string) {
		return this.dbService.delete(resource, id)
	}
}
