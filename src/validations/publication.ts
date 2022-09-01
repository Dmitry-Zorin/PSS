import { preprocessToNumber } from 'utils/validation'
import { z } from 'zod'
import { common } from './common'

export const getPublicationsSchema = z
	.strictObject({
		category: z.string(),
		search: common.search,
		page: common.page,
		perPage: common.perPage,
		sortField: z.string(),
		sortOrder: z.enum(['asc', 'desc']),
	})
	.partial()

export type GetPublications = z.infer<typeof getPublicationsSchema>

const currentYear = new Date().getFullYear()

const fields = {
	title: z.string().min(8).max(300),
	description: z.string().max(2000),
	category: z.string().max(20),
	type: z.string().max(50),
	publicationPlace: z.string().max(300),
	writtenInYear: preprocessToNumber(
		z
			.number()
			.int()
			.min(currentYear - 100)
			.max(currentYear),
	),
	volumeInPages: preprocessToNumber(z.number().int().max(100)),
	extraData: z.string().max(2000),
	authors: z.object({ id: common.id }).array().min(1).max(10),
	authorIds: common.ids.max(10),
	coauthors: z.string().array(),
}

export const publicationFormSchema = z.strictObject({
	title: fields.title,
	description: fields.description.or(z.literal('')),
	type: fields.type.or(z.literal('')),
	writtenInYear: fields.writtenInYear.or(z.literal('')),
	volumeInPages: fields.volumeInPages.or(z.literal('')),
	authors: fields.authors,
	coauthors: fields.coauthors,
	publicationPlace: fields.publicationPlace.or(z.literal('')),
	extraData: fields.extraData.or(z.literal('')),
})

export type PublicationFormData = z.infer<typeof publicationFormSchema>

export const createPublicationSchema = z.strictObject({
	title: fields.title,
	description: fields.description.optional(),
	category: fields.category,
	type: fields.type,
	writtenInYear: fields.writtenInYear.default(currentYear),
	volumeInPages: fields.volumeInPages.default(1),
	authorIds: fields.authorIds,
	coauthors: fields.coauthors.optional(),
	publicationPlace: fields.publicationPlace.optional(),
	extraData: fields.extraData.optional(),
})

export type CreatePublication = z.infer<typeof createPublicationSchema>

export const updatePublicationSchema = createPublicationSchema
	.omit({ category: true })
	.extend({
		description: fields.description.or(z.literal(null)).default(null),
		writtenInYear: fields.writtenInYear.default(currentYear),
		volumeInPages: fields.volumeInPages.default(1),
		coauthors: fields.coauthors.default([]),
		publicationPlace: fields.publicationPlace.or(z.literal(null)).default(null),
		extraData: fields.extraData.or(z.literal(null)).default(null),
	})

export type UpdatePublication = z.infer<typeof updatePublicationSchema>
