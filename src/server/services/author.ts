import { Author, Prisma } from '@prisma/client'
import { addAuthorName } from 'helpers/authors'
import httpError from 'http-errors'
import prisma from 'server/prisma'
import { getSearchFilter } from 'utils/filters'
import { CreateAuthor, GetAuthors, UpdateAuthor } from 'validations/author'
import { Id } from 'validations/common'

const defaultAuthorSelect = Prisma.validator<Prisma.AuthorSelect>()({
	id: true,
	lastName: true,
	firstName: true,
	middleName: true,
	info: true,
})

export async function findAuthor(id: Id) {
	const record = await prisma.author.findUnique({
		select: defaultAuthorSelect,
		where: { id },
	})
	if (!record) {
		throw new httpError.NotFound('Автор не найден')
	}
	return addAuthorName(record)
}

export type GetAuthorResponse = Awaited<ReturnType<typeof findAuthor>>

export async function findAuthors(filters: GetAuthors) {
	const { ids, search, page = 1, perPage = 1 } = filters

	if (ids) {
		const records = await prisma.author.findMany({
			where: { id: { in: ids } },
		})
		return {
			total: ids.length,
			records: records.map(addAuthorName),
		}
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

	return { records: records.map(addAuthorName), total }
}

export type GetAuthorsResponse = Awaited<ReturnType<typeof findAuthors>>

export async function createAuthor(author: CreateAuthor) {
	return prisma.author.create({
		select: defaultAuthorSelect,
		data: author,
	})
}

export type CreateAuthorResponse = Awaited<ReturnType<typeof createAuthor>>

export async function updateAuthor(author: UpdateAuthor) {
	const { id, ...data } = author
	return prisma.author.update({
		select: defaultAuthorSelect,
		where: { id },
		data,
	})
}

export type UpdateAuthorResponse = Awaited<ReturnType<typeof updateAuthor>>

export async function deleteAuthor(id: Id) {
	return prisma.author.delete({
		select: defaultAuthorSelect,
		where: { id },
	})
}

export type DeleteAuthorResponse = Awaited<ReturnType<typeof deleteAuthor>>
