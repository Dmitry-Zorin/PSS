import { z } from 'zod'

const currentYear = new Date().getFullYear()

export const publicationSchema = z.object({
	title: z.string().min(8).max(300),
	description: z.string().min(4).max(2000).optional(),
	year: z
		.number()
		.min(currentYear - 100)
		.max(currentYear)
		.default(currentYear),
	volume: z.number().min(1).max(100).default(1),
	extraData: z.string().max(2000).optional(),
})
