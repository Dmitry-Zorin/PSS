import { Prisma, Publication } from '@prisma/client'
import { PER_PAGE } from 'constants/app'
import { formatAuthors } from 'helpers/authors'
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

const publicationWithoutAuthorsSelect =
	Prisma.validator<Prisma.PublicationSelect>()({
		id: true,
		createdAt: true,
		updatedAt: true,
		category: true,
		title: true,
		description: true,
		type: true,
		character: true,
		publicationPlace: true,
		writtenInYear: true,
		volumeInPages: true,
		coauthors: true,
		extraData: true,
	})

const defaultPublicationSelect = Prisma.validator<Prisma.PublicationSelect>()({
	...publicationWithoutAuthorsSelect,
	authors: {
		select: {
			author: {
				select: {
					id: true,
					lastName: true,
					firstName: true,
					middleName: true,
				},
			},
			order: true,
		},
	},
})

function formatPublication(
	record: Prisma.PublicationGetPayload<{
		select: typeof defaultPublicationSelect
	}>,
) {
	return omitNull({
		...record,
		authors: formatAuthors(record.authors),
	})
}

export async function findPublication(id: Id) {
	const record = await prisma.publication.findUnique({
		select: defaultPublicationSelect,
		where: { id },
	})
	if (!record) {
		throw new httpError.NotFound('Публикация не найдена')
	}
	return formatPublication(record)
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
		authorId,
	} = filters

	const where = {
		AND: [
			{
				category,
				...(authorId && {
					authors: {
						some: {
							authorId,
						},
					},
				}),
			},
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

	return omitNull({ records: records.map(formatPublication), total })
}

export type GetPublicationsResponse = Jsonify<
	Awaited<ReturnType<typeof findPublications>>
>

export async function createPublication(publication: CreatePublication) {
	const { authorIds, ...data } = publication

	return formatPublication(
		await prisma.publication.create({
			select: defaultPublicationSelect,
			data: {
				...data,
				authors: {
					createMany: {
						data: authorIds.map((id, i) => ({
							authorId: id,
							order: i + 1,
						})),
					},
				},
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
	const [, record] = await prisma.$transaction([
		prisma.publication.update({
			where: { id },
			data: {
				authors: {
					deleteMany: {},
				},
			},
		}),
		prisma.publication.update({
			select: defaultPublicationSelect,
			where: { id },
			data: {
				...data,
				authors: {
					createMany: {
						data: authorIds.map((id, i) => ({
							authorId: id,
							order: i + 1,
						})),
					},
				},
			},
		}),
	])
	return formatPublication(record)
}

export type UpdatePublicationResponse = Jsonify<
	Awaited<ReturnType<typeof updatePublication>>
>

export async function deletePublication(id: Id) {
	const authorToPublication = await prisma.authorToPublication.findMany({
		select: { authorId: true },
		where: { publicationId: id },
	})
	const [, record] = await prisma.$transaction([
		prisma.authorToPublication.deleteMany({
			where: { publicationId: id },
		}),
		prisma.publication.delete({
			select: publicationWithoutAuthorsSelect,
			where: { id },
		}),
	])
	return {
		...record,
		authorIds: authorToPublication.map((e) => e.authorId),
	}
}

export type DeletePublicationResponse = Jsonify<
	Awaited<ReturnType<typeof deletePublication>>
>
