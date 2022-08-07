import { Publication } from '@prisma/client'
import {
	CreatePublicationDto,
	GetPublicationsFilters,
	UpdatePublicationDto,
} from 'constants/validation'
import { prisma } from 'lib/api'
import { getSearchFilter } from 'utils'

export async function findPublication(id: number) {
	return prisma.publication.findUniqueOrThrow({
		where: { id },
	})
}

export async function findPublications(filters: GetPublicationsFilters) {
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
		{ writtenInYear: 'desc' },
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

export async function createPublication(publication: CreatePublicationDto) {
	const { type, writtenInYear, volumeInPages } = publication
	return prisma.publication.create({
		data: {
			...publication,
			type: type || publication.category,
			writtenInYear: writtenInYear || new Date().getFullYear(),
			volumeInPages: volumeInPages || 1,
		},
	})
}

export async function updatePublication(publication: UpdatePublicationDto) {
	const { id, ...data } = publication
	return prisma.publication.update({ where: { id }, data })
}

export async function deletePublication(id: number) {
	return prisma.publication.delete({ where: { id } })
}
