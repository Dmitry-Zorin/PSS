import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const publicationSchema = z.object({
	title: z.string().min(8).max(300),
	description: z.string().min(4).max(2000).optional().or(z.literal('')),
	year: z
		.number()
		.min(currentYear - 100)
		.max(currentYear)
		.default(currentYear)
		.or(z.literal('')),
	volume: z.number().min(1).max(100).default(1).or(z.literal('')),
	extraData: z.string().max(2000).optional().or(z.literal('')),
})

export const publicationQuerySchema = z
	.object({
		id: z.string().regex(/^\d+$/).transform(Number),
		category: z.string(),
		search: z.string(),
		sortField: z.string(),
		sortOrder: z.enum(['asc', 'desc']),
		skip: z.string().regex(/^\d+$/).transform(Number),
		take: z.string().regex(/^\d+$/).transform(Number),
	})
	.partial()
