import { Injectable } from '@nestjs/common'
import { zipObject } from 'lodash'
import { DbService } from './db/db.service'
import { PaginationOptions } from './list-params.pipe'

@Injectable()
export class ResourcesService {
	constructor(private readonly dbService: DbService) {}

	create(resource: string, payload: any, file: Express.Multer.File) {
		return this.dbService.create(resource, payload)
	}

	async countAll() {
		const resources = this.dbService.getResources()
		const countPromises = resources.map(resource => (
			this.dbService.getResourceCount(resource))
		)
		return zipObject(resources, await Promise.all(countPromises))
	}

	findAll(resource: string, listParams: PaginationOptions) {
		return this.dbService.findAll(resource, listParams)
	}

	getRange(resource: string, total: number, listParams: PaginationOptions) {
		const { skip = 0, limit = total } = listParams
		return `${resource} ${skip}-${Math.min(limit, total)}/${total}`
	}

	findOne(resource: string, id: string) {
		return this.dbService.findOne(resource, id)
	}

	getFileUrl(resource: string, fileId: string) {
		return `${process.env.SERVER}/files/${resource}/${fileId}`
	}

	update(resource: string, id: string, payload: any, file: Express.Multer.File) {
		return this.dbService.update(resource, id, payload)
	}

	remove(resource: string, id: string) {
		return this.dbService.delete(resource, id)
	}
}
