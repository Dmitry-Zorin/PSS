import {
	preprocessToNumber,
	transformEmptyStringToUndefined,
} from 'utils/validation'
import { z } from 'zod'
import { idSchema } from './common'

export const getAuthorsSchema = z
	.strictObject({
		search: z.string(),
		page: preprocessToNumber(z.number().int()),
		perPage: preprocessToNumber(z.number().int().max(100)),
	})
	.partial()

export type GetAuthors = z.infer<typeof getAuthorsSchema>

export const authorSchema = z.strictObject({
	lastName: z.string().min(2).max(20),
	firstName: z.string().min(2).max(20),
	middleName: z
		.string()
		.min(2)
		.max(20)
		.or(transformEmptyStringToUndefined())
		.optional(),
	info: z
		.string()
		.min(2)
		.max(2000)
		.or(transformEmptyStringToUndefined())
		.optional(),
})

export type CreateAuthor = z.infer<typeof authorSchema>

export const updateAuthorSchema = authorSchema.merge(idSchema)

export type UpdateAuthor = z.infer<typeof updateAuthorSchema>