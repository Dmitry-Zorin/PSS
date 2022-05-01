import { Injectable } from '@nestjs/common'
import { DbService, Role } from './db/db.service'
import { PaginationOptions } from './list-params.pipe'

@Injectable()
export class ResourcesService {
	constructor(private readonly dbService: DbService) {}

	countAll() {
		return this.dbService.getResourcesCount()
	}

	create(resource: string, payload: any) {
		return this.dbService.create(resource, payload)
	}

	findAll(resource: string, listParams: PaginationOptions, role: Role) {
		return this.dbService.findAll(resource, listParams, role)
	}

	getRange(resource: string, total: number, listParams: PaginationOptions) {
		const { skip = 0, limit = total } = listParams
		return `${resource} ${skip}-${Math.min(limit, total)}/${total}`
	}

	findOne(resource: string, id: string, role: Role) {
		return this.dbService.findOne(resource, id, role)
	}

	update(resource: string, id: string, payload: any) {
		return this.dbService.update(resource, id, payload)
	}

	remove(resource: string, id: string) {
		return this.dbService.delete(resource, id)
	}
}
