import { preprocessToNumber } from 'utils/validation'
import { z } from 'zod'
import { common } from './common'

export const getPublicationsSchema = z
	.strictObject({
		type: z.string(),
		search: common.search,
		page: common.page,
		perPage: common.perPage,
		sortField: z.string(),
		sortOrder: z.enum(['asc', 'desc']),
		authorId: common.id,
	})
	.partial()

export type GetPublications = z.infer<typeof getPublicationsSchema>

const currentYear = new Date().getFullYear()

const fields = {
	title: z.string().min(8).max(300),
	description: z.string().max(5000),
	type: z.string().max(50),
	typeName: z.string().min(1).max(100),
	publicationYear: preprocessToNumber(
		z
			.number()
			.int()
			.min(currentYear - 100)
			.max(currentYear),
	),
	pageCount: preprocessToNumber(z.number().int().min(1).max(1000)),
	authors: z.object({ id: common.id }).array().min(1).max(10),
	authorIds: common.ids.max(10),
	coauthors: z.string().array(),
	publicationPlace: z.string().max(300),
	publicationForm: z.string().max(50),
	extraData: z.string().max(5000),
}

export const publicationFormSchema = z.strictObject({
	title: fields.title,
	description: fields.description.or(z.literal('')),
	typeName: fields.typeName.or(z.literal('')),
	publicationYear: fields.publicationYear.or(z.literal('')),
	pageCount: fields.pageCount.or(z.literal('')),
	authors: fields.authors,
	coauthors: fields.coauthors,
	publicationPlace: fields.publicationPlace.or(z.literal('')),
	publicationForm: fields.publicationForm.or(z.literal('')),
	extraData: fields.extraData.or(z.literal('')),
})

export type PublicationFormData = z.infer<typeof publicationFormSchema>

export const createPublicationSchema = z.strictObject({
	title: fields.title,
	description: fields.description.optional(),
	type: fields.type,
	typeName: fields.typeName,
	publicationYear: fields.publicationYear.default(currentYear),
	pageCount: fields.pageCount.default(1),
	authorIds: fields.authorIds,
	coauthors: fields.coauthors.optional(),
	publicationPlace: fields.publicationPlace.optional(),
	publicationForm: fields.publicationForm.optional(),
	extraData: fields.extraData.optional(),
})

export type CreatePublication = z.infer<typeof createPublicationSchema>

export const updatePublicationSchema = createPublicationSchema
	.omit({ type: true })
	.extend({
		description: fields.description.or(z.literal(null)).default(null),
		publicationYear: fields.publicationYear.default(currentYear),
		pageCount: fields.pageCount.default(1),
		coauthors: fields.coauthors.default([]),
		publicationPlace: fields.publicationPlace.or(z.literal(null)).default(null),
		publicationForm: fields.publicationPlace.or(z.literal(null)).default(null),
		extraData: fields.extraData.or(z.literal(null)).default(null),
	})

export type UpdatePublication = z.infer<typeof updatePublicationSchema>
