export interface Publication {
	id: string
	resourceItemId: string
	title: string
	type?: string
	characterId?: string
	publicationPlace?: string
	year?: number
	outputData?: string
	volume?: number
	authorIds: string[]
	coauthors: string[]
}
