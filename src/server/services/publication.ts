import { Prisma, Publication } from '@prisma/client'
import httpError from 'http-errors'
import prisma from 'server/prisma'
import { getSearchFilter } from 'utils/filters'
import { Id } from 'validations/common'
import {
	CreatePublication,
	GetPublications,
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

export async function findPublication(id: Id) {
	const record = await prisma.publication.findUnique({
		select: defaultPublicationSelect,
		where: { id },
	})
	if (!record) {
		throw new httpError.NotFound('Публикация не найдена')
	}
	return record
}

export type GetPublicationResponse = Awaited<ReturnType<typeof findPublication>>

export async function findPublications(filters: GetPublications) {
	const {
		category,
		search,
		sortField,
		sortOrder = 'asc',
		page = 1,
		perPage = 1,
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

	const [total, records] = await prisma.$transaction([
		prisma.publication.count({ where }),
		prisma.publication.findMany({
			select: defaultPublicationSelect,
			where,
			orderBy,
			skip: (page - 1) * perPage,
			take: perPage,
		}),
	])

	return { records, total }
}

export type GetPublicationsResponse = Awaited<
	ReturnType<typeof findPublications>
>

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

export type CreatePublicationResponse = Awaited<
	ReturnType<typeof createPublication>
>

export async function updatePublication(publication: UpdatePublication) {
	const { id, ...data } = publication
	return prisma.publication.update({
		select: defaultPublicationSelect,
		where: { id },
		data,
	})
}

export type UpdatePublicationResponse = Awaited<
	ReturnType<typeof updatePublication>
>

export async function deletePublication(id: Id) {
	return prisma.publication.delete({
		select: defaultPublicationSelect,
		where: { id },
	})
}

export type DeletePublicationResponse = Awaited<
	ReturnType<typeof deletePublication>
>
