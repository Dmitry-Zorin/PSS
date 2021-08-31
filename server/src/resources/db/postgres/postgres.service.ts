import { Injectable, NotFoundException } from '@nestjs/common'
import { keys, transform, values } from 'lodash'
import { pluralize } from 'mongoose'
import { DbService, DeleteResult, FindOneResult, UpdateResult } from '../db.service'
import * as entities from './entities'

type ActiveRecord = typeof entities[keyof typeof entities]

@Injectable()
export class PostgresService extends DbService {
	private readonly entities: Record<string, ActiveRecord>

	constructor() {
		super()
		this.entities = transform(entities, (result, value, key) => {
			result[pluralize()!(key)] = value
		})
	}

	getResources() {
		return keys(this.entities)
	}

	getResourceCount(resource: string) {
		const Record = this.entities[resource]
		return Record.count()
	}

	async create(resource: string, payload: any) {
		const Record = this.entities[resource]
		const { identifiers } = await Record.insert(payload)
		return values(identifiers[0])[0]
	}

	findAll(resource: string, options: any) {
		const Record = this.entities[resource]
		return Record.findAndCount(options)
	}

	findOne(resource: string, filter: any): FindOneResult
	findOne(resource: string, id: string): FindOneResult
	findOne(resource: string, filterOrId: any): FindOneResult {
		const Record = this.entities[resource]
		return Record.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})
	}

	async update(resource: string, filter: any, update: any): UpdateResult
	async update(resource: string, id: string, update: any): UpdateResult
	async update(resource: string, filterOrId: any, update: any): UpdateResult {
		const Record = this.entities[resource]
		const record = await Record.findOneOrFail(filterOrId).catch(() => {
			throw new NotFoundException()
		})
		return (record as any).file?.id
	}

	async delete(resource: string, filter: any): DeleteResult
	async delete(resource: string, id: string): DeleteResult
	async delete(resource: string, filterOrId: any): DeleteResult {
		const Record = this.entities[resource]
		const record = await Record.findOne(filterOrId)
		if (record) {
			await Record.remove(record)
			return (record as any).file?.id
		}
	}
}
