import { isBrowser } from 'utils/env'
import {
	preprocessToNumber,
	transformEmptyStringToUndefined,
} from 'utils/validation'
import { z } from 'zod'
import { MAX_PER_PAGE } from './../constants/app'

export const getPublicationsSchema = z
	.strictObject({
		category: z.string(),
		search: z.string(),
		sortField: z.string(),
		sortOrder: z.enum(['asc', 'desc']),
		page: preprocessToNumber(z.number().int()),
		perPage: preprocessToNumber(z.number().int().max(MAX_PER_PAGE)),
	})
	.partial()

export type GetPublications = z.infer<typeof getPublicationsSchema>

const currentYear = new Date().getFullYear()

export const publicationSchema = z.strictObject({
	title: z.string().min(8).max(300),
	description: z
		.string()
		.min(4)
		.max(2000)
		.or(transformEmptyStringToUndefined())
		.optional(),
	type: z
		.string()
		.min(4)
		.max(50)
		.or(transformEmptyStringToUndefined())
		.optional(),
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
	extraData: z
		.string()
		.max(2000)
		.or(transformEmptyStringToUndefined())
		.optional(),
	file: isBrowser
		? z
				.instanceof(File)
				.refine((file) => file.size < 1 * 1000 * 1000, {
					message: 'Файл не дожен превышать 3МБ',
				})
				.optional()
		: z.any(),
})

export const createPublicationSchema = publicationSchema.extend({
	category: z.string().min(4).max(20),
	type: z.string().min(4).max(50),
	authorIds: preprocessToNumber(z.number().int()).array().max(10),
	coauthors: z.string().array(),
})

export type CreatePublication = z.infer<typeof createPublicationSchema>

export const updatePublicationSchema = publicationSchema.extend({
	authorIds: preprocessToNumber(z.number().int()).array().max(10),
})

export type UpdatePublication = z.infer<typeof updatePublicationSchema>
