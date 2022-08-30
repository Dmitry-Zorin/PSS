import { Prisma, Publication } from '@prisma/client'
import { PER_PAGE } from 'constants/app'
import { addAuthorNames } from 'helpers/authors'
import httpError from 'http-errors'
import prisma from 'server/prisma'
import { Jsonify } from 'type-fest'
import { getSearchFilter } from 'utils/filters'
import { omitNull } from 'utils/helpers'
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
	authors: {
		select: {
			id: true,
			lastName: true,
			firstName: true,
			middleName: true,
		},
	},
})

export async function findPublication(id: Id) {
	const record = await prisma.publication.findUnique({
		select: defaultPublicationSelect,
		where: { id },
	})
	if (!record) {
		throw new httpError.NotFound('Публикация не найдена')
	}
	return omitNull(addAuthorNames(record))
}

export type GetPublicationResponse = Awaited<ReturnType<typeof findPublication>>

export async function findPublications(filters: GetPublications) {
	const {
		category,
		search,
		sortField,
		sortOrder = 'asc',
		page = 1,
		perPage = PER_PAGE,
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

	return omitNull({ records: records.map(addAuthorNames), total })
}

export type GetPublicationsResponse = Jsonify<
	Awaited<ReturnType<typeof findPublications>>
>

export async function createPublication(publication: CreatePublication) {
	const {
		writtenInYear = new Date().getFullYear(),
		volumeInPages = 1,
		authorIds,
		...otherFields
	} = publication

	return omitNull(
		await prisma.publication.create({
			select: defaultPublicationSelect,
			data: {
				...otherFields,
				writtenInYear,
				volumeInPages,
				...(authorIds && {
					authors: {
						connect: authorIds.map((id) => ({ id })),
					},
				}),
			},
		}),
	)
}

export type CreatePublicationResponse = Jsonify<
	Awaited<ReturnType<typeof createPublication>>
>

export async function updatePublication(
	id: Id,
	publication: UpdatePublication,
) {
	const { authorIds, ...data } = publication
	return omitNull(
		await prisma.publication.update({
			select: defaultPublicationSelect,
			where: { id },
			data: {
				...data,
				...(authorIds && {
					authors: {
						set: authorIds.map((id) => ({ id })),
					},
				}),
			},
		}),
	)
}

export type UpdatePublicationResponse = Jsonify<
	Awaited<ReturnType<typeof updatePublication>>
>

export async function deletePublication(id: Id) {
	return omitNull(
		await prisma.publication.delete({
			select: defaultPublicationSelect,
			where: { id },
		}),
	)
}

export type DeletePublicationResponse = Jsonify<
	Awaited<ReturnType<typeof deletePublication>>
>
