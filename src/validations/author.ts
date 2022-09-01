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

export const authorFormSchema = z.strictObject({
	lastName: z.string().max(20),
	firstName: z.string().max(20),
	middleName: z.string().max(20).optional(),
	info: z.string().max(2000).optional(),
})

export type CreateAuthor = z.infer<typeof authorFormSchema>

export const updateAuthorSchema = authorFormSchema

export type UpdateAuthor = z.infer<typeof updateAuthorSchema>
