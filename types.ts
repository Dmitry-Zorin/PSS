export type Query = Record<string, string | undefined>

export interface GetListResponse<Record> {
	records: Record[]
	total: number
}
