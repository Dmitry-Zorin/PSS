import { preprocessToNumber, transformEmptyStringToUndefined } from 'utils'
import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const publicationIdSchema = z.object({
	id: preprocessToNumber(z.number().int()),
})

export const publicationSchema = z.object({
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

export type CreatePublicationDto = z.infer<typeof createPublicationSchema>

export const updatePublicationSchema = publicationSchema.extend({
	id: preprocessToNumber(z.number().int()),
})

export type UpdatePublicationDto = z.infer<typeof updatePublicationSchema>

export const publicationQuerySchema = z
	.object({
		id: preprocessToNumber(z.number().int()),
		category: z.string(),
		search: z.string(),
		sortField: z.string(),
		sortOrder: z.enum(['asc', 'desc']),
		skip: preprocessToNumber(z.number().int()),
		take: preprocessToNumber(z.number().int()),
	})
	.partial()

export type GetPublicationsFilters = z.infer<typeof publicationQuerySchema>
