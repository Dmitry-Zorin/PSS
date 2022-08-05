import { Publication } from '@prisma/client'
import { prisma } from 'lib/api'
import { publicationQuerySchema } from 'pages/api/publications'
import { getSearchFilter } from 'utils'
import { z } from 'zod'

export async function getPublication(id: number) {
	return prisma.publication.findUniqueOrThrow({
		where: { id },
	})
}

type GetPublicationsFilters = z.infer<typeof publicationQuerySchema>

export async function getPublications(filters: GetPublicationsFilters) {
	const {
		category,
		search,
		sortField,
		sortOrder = 'asc',
		skip,
		take = 25,
	} = filters

	const where = {
		AND: [
			{ category },
			getSearchFilter<Publication>(search, ['title', 'description']),
		],
	}

	const orderBy: { [key in keyof Partial<Publication>]: 'asc' | 'desc' }[] = [
		{ year: 'desc' },
		{ createdAt: 'desc' },
	]

	if (sortField && sortOrder) {
		orderBy.unshift({ [sortField]: sortOrder })
	}

	return {
		total: await prisma.publication.count({ where }),
		records: await prisma.publication.findMany({
			where,
			orderBy,
			skip,
			take,
		}),
	}
}
