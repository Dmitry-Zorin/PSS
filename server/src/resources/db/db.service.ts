export type FindOneResult = Promise<any>
export type UpdateResult = Promise<string>
export type DeleteResult = Promise<string>

export abstract class DbService {
	abstract getResourcesCount(): Promise<any>

	abstract create(resource: string, payload: any): Promise<string>

	abstract findList(resource: string, options: any): Promise<any>

	abstract findMany(resource: string, ids: string[]): Promise<any[]>

	abstract findOne(resource: string, filter: any): FindOneResult
	abstract findOne(resource: string, id: string): FindOneResult

	abstract update(resource: string, filter: any, update: any): UpdateResult
	abstract update(resource: string, id: string, update: any): UpdateResult

	abstract delete(resource: string, filter: any): DeleteResult
	abstract delete(resource: string, id: string): DeleteResult
}
