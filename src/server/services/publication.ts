import { Prisma, Publication } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import prisma from 'server/prisma'
import { getSearchFilter } from 'utils'
import {
	CreatePublication,
	GetPublicationFilters,
	UpdatePublication,
} from 'validations/publication'

const defaultPublicationSelect = Prisma.validator<Prisma.PublicationSelect>()({
	id: true,
	createdAt: true,
	updatedAt: true,
	category: true,
	title: true,
	description: true,
	type: true,
	characterId: true,
	publicationPlace: true,
	writtenInYear: true,
	volumeInPages: true,
	coauthors: true,
	extraData: true,
})

export async function findPublication(id: number) {
	const record = await prisma.publication.findUnique({
		select: defaultPublicationSelect,
		where: { id },
	})
	if (!record) {
		throw new TRPCError({ code: 'NOT_FOUND' })
	}
	return record
}

export async function findPublications(filters: GetPublicationFilters) {
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
			select: defaultPublicationSelect,
			where,
			orderBy,
			skip,
			take,
		}),
	}
}

type List = ReturnType<typeof findPublications>

export async function createPublication(publication: CreatePublication) {
	const { type, writtenInYear, volumeInPages } = publication
	return prisma.publication.create({
		select: defaultPublicationSelect,
		data: {
			...publication,
			type: type || publication.category,
			writtenInYear: writtenInYear || new Date().getFullYear(),
			volumeInPages: volumeInPages || 1,
		},
	})
}

export async function updatePublication(publication: UpdatePublication) {
	const { id, ...data } = publication
	return prisma.publication.update({
		select: defaultPublicationSelect,
		where: { id },
		data,
	})
}

export async function deletePublication(id: number) {
	return prisma.publication.delete({
		select: defaultPublicationSelect,
		where: { id },
	})
}
