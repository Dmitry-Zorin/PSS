import { z } from 'zod'
import { common } from './common'

export const getAuthorsSchema = z
	.strictObject({
		ids: common.ids,
		search: common.search,
		page: common.page,
		perPage: common.perPage,
	})
	.partial()

export type GetAuthors = z.infer<typeof getAuthorsSchema>

const fields = {
	lastName: z.string().min(1).max(20),
	firstName: z.string().min(1).max(20),
	middleName: z.string().max(20),
	info: z.string().max(2000),
}

export const authorFormSchema = z.strictObject({
	lastName: fields.lastName,
	firstName: fields.firstName,
	middleName: fields.middleName.or(z.literal('')),
	info: fields.info.or(z.literal('')),
})

export type AuthorFormData = z.infer<typeof authorFormSchema>

export const createAuthorSchema = z.strictObject({
	lastName: fields.lastName,
	firstName: fields.firstName,
	middleName: fields.middleName.optional(),
	info: fields.info.optional(),
})

export type CreateAuthor = z.infer<typeof createAuthorSchema>

export const updateAuthorSchema = z.strictObject({
	lastName: fields.lastName,
	firstName: fields.firstName,
	middleName: fields.middleName.or(z.literal(null)).default(null),
	info: fields.info.or(z.literal(null)).default(null),
})

export type UpdateAuthor = z.infer<typeof updateAuthorSchema>
