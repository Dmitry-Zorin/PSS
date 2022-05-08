interface FindListResult {
	records: any[]
	total: number
}

export abstract class DbService {
	abstract getCount(): Promise<Record<string, number>>

	abstract getCategories(): Promise<Record<string, string[]>>

	abstract createOne(resource: string, payload: any): Promise<string>

	abstract findList(resource: string, options: any): Promise<FindListResult>

	abstract findMany(resource: string, ids: string[]): Promise<any[]>

	abstract findOne(resource: string, id: string): Promise<any>

	abstract updateOne(resource: string, id: string, update: any): Promise<string>

	abstract delete(resource: string, filter: any): Promise<string[]>
}
