import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db/db.service'

export class DbServiceMock extends DbService {
	private readonly collection = new Map<string, any>()

	getResources() {
		return []
	}

	async getResourceCount(collection: string) {
		return 0
	}

	async create(resource: string, payload: any) {
		const id = this.collection.size.toString()
		this.collection.set(id, { ...payload, id })
		return id
	}

	findAll(resource: string, options: any) {
		return Promise.resolve(undefined)
	}

	async findOne(resource: string, filter: any): FindOneResult
	async findOne(resource: string, id: string): FindOneResult
	async findOne(resource: string, filterOrId: any): FindOneResult {
		return this.collection.get(filterOrId)
	}

	update(resource: string, filter: any, update: any): UpdateResult
	update(resource: string, id: string, update: any): UpdateResult
	update(resource: string, filterOrId: any, update: any): UpdateResult {
		return Promise.resolve(undefined)
	}

	delete(resource: string, filter: any): DeleteResult
	delete(resource: string, id: string): DeleteResult
	delete(resource: string, filterOrId: any): DeleteResult {
		return Promise.resolve(undefined)
	}
}
