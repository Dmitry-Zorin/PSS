export enum Role {
	User = 'user',
	Admin = 'admin'
}

export type FindOneResult = Promise<any>
export type UpdateResult = Promise<string>
export type DeleteResult = Promise<string>

export abstract class DbService {
	abstract getResources(): string[]

	abstract getResourceCount(resource: string): Promise<number>

	abstract create(resource: string, payload: any): Promise<string>

	abstract findAll(resource: string, options: any, role: Role): Promise<any>

	abstract findOne(resource: string, filter: any, role: Role): FindOneResult
	abstract findOne(resource: string, id: string, role: Role): FindOneResult

	abstract update(resource: string, filter: any, update: any): UpdateResult
	abstract update(resource: string, id: string, update: any): UpdateResult

	abstract delete(resource: string, filter: any): DeleteResult
	abstract delete(resource: string, id: string): DeleteResult
}
