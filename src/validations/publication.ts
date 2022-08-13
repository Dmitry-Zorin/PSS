import {
	preprocessToNumber,
	transformEmptyStringToUndefined,
} from 'utils/validation'
import { z } from 'zod'

const currentYear = new Date().getFullYear()

function strictObject<T extends z.ZodRawShape>(object: T) {
	return z.object(object).strict()
}

export const publicationIdSchema = strictObject({
	id: preprocessToNumber(z.number().int()),
})

export const publicationSchema = strictObject({
	title: z.string().min(8).max(300),
	description: z.string().min(4).max(2000).optional().or(z.literal('')),
	type: z.string().min(4).max(50).optional().or(z.literal('')),
	writtenInYear: preprocessToNumber(
		z
			.number()
			.int()
			.min(currentYear - 100)
			.max(currentYear),
	)
		.or(transformEmptyStringToUndefined())
		.optional(),
	volumeInPages: preprocessToNumber(z.number().int().min(1).max(100))
		.or(transformEmptyStringToUndefined())
		.optional(),
	extraData: z.string().max(2000).optional().or(z.literal('')),
})

export const createPublicationSchema = publicationSchema.extend({
	category: z.string().min(4).max(20),
})

export type CreatePublication = z.infer<typeof createPublicationSchema>

export const updatePublicationSchema =
	publicationSchema.merge(publicationIdSchema)

export type UpdatePublication = z.infer<typeof updatePublicationSchema>

export const publicationFiltersSchema = strictObject({
	category: z.string(),
	search: z.string(),
	sortField: z.string(),
	sortOrder: z.enum(['asc', 'desc']),
	skip: preprocessToNumber(z.number().int()),
	take: preprocessToNumber(z.number().int()),
}).partial()

export type GetPublicationFilters = z.infer<typeof publicationFiltersSchema>
