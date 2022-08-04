import { Author, Publication } from '@prisma/client'

export type Query = Record<string, string | undefined>

export interface GetPublicationsResponse {
	publications: Publication[]
	total: number
}

export interface GetAuthorsResponse {
	authors: Author[]
	total: number
}
