import { Author, Prisma } from '@prisma/client'
import { PER_PAGE } from 'constants/app'
import { addAuthorName, formatAuthors } from 'helpers/authors'
import httpError from 'http-errors'
import prisma from 'server/prisma'
import { Jsonify } from 'type-fest'
import { getSearchFilter } from 'utils/filters'
import { omitNull } from 'utils/helpers'
import { CreateAuthor, GetAuthors, UpdateAuthor } from 'validations/author'
import { Id } from 'validations/common'

const defaultAuthorSelect = Prisma.validator<Prisma.AuthorSelect>()({
	id: true,
	lastName: true,
	firstName: true,
	middleName: true,
	info: true,
})

const authorWithPublicationsSelect = Prisma.validator<Prisma.AuthorSelect>()({
	...defaultAuthorSelect,
	publications: {
		select: {
			publication: {
				select: {
					id: true,
					title: true,
					description: true,
					category: true,
					type: true,
					writtenInYear: true,
					volumeInPages: true,
					coauthors: true,
					publicationPlace: true,
					character: true,
					extraData: true,
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
				},
			},
		},
	},
})

function formatAuthor(
	record: Prisma.AuthorGetPayload<{
		select: typeof authorWithPublicationsSelect
	}>,
) {
	return omitNull({
		...addAuthorName(record),
		publications: record.publications.map(({ publication }) => ({
			...publication,
			authors: formatAuthors(publication.authors),
		})),
	})
}

export async function findAuthor(id: Id) {
	const record = await prisma.author.findUnique({
		select: authorWithPublicationsSelect,
		where: { id },
	})
	if (!record) {
		throw new httpError.NotFound('Автор не найден')
	}
	return formatAuthor(record)
}

export type GetAuthorResponse = Awaited<ReturnType<typeof findAuthor>>

export async function findAuthors(filters: GetAuthors) {
	const { ids, search, page = 1, perPage = PER_PAGE } = filters

	if (ids) {
		const records = await prisma.author.findMany({
			where: { id: { in: ids } },
		})
		return omitNull({
			total: ids.length,
			records: records.map(addAuthorName),
		})
	}

	const where = getSearchFilter<Author>(search, [
		'lastName',
		'firstName',
		'middleName',
	])

	const [total, records] = await prisma.$transaction([
		prisma.author.count({ where }),
		prisma.author.findMany({
			select: defaultAuthorSelect,
			where,
			orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
			skip: (page - 1) * perPage,
			take: perPage,
		}),
	])

	return omitNull({ records: records.map(addAuthorName), total })
}

export type GetAuthorsResponse = Jsonify<
	Awaited<ReturnType<typeof findAuthors>>
>

export async function createAuthor(author: CreateAuthor) {
	return omitNull(
		await prisma.author.create({
			select: defaultAuthorSelect,
			data: author,
		}),
	)
}

export type CreateAuthorResponse = Jsonify<
	Awaited<ReturnType<typeof createAuthor>>
>

export async function updateAuthor(id: Id, author: UpdateAuthor) {
	const record = await prisma.author.update({
		select: authorWithPublicationsSelect,
		where: { id },
		data: author,
	})
	return formatAuthor(record)
}

export type UpdateAuthorResponse = Jsonify<
	Awaited<ReturnType<typeof updateAuthor>>
>

export async function deleteAuthor(id: Id) {
	const publications = await prisma.publication.findMany({
		select: {
			id: true,
			category: true,
		},
		where: {
			authors: {
				some: {
					authorId: id,
				},
			},
		},
	})

	const [, record] = await prisma.$transaction([
		prisma.authorToPublication.deleteMany({
			where: { authorId: id },
		}),
		prisma.author.delete({
			select: defaultAuthorSelect,
			where: { id },
		}),
	])

	return { ...record, publications }
}

export type DeleteAuthorResponse = Jsonify<
	Awaited<ReturnType<typeof deleteAuthor>>
>
