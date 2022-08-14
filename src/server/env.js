const { z } = require('zod')

const envSchema = z.object({
	DATABASE_URL: z.string().url(),
})

const { success, error } = envSchema.safeParse(process.env)

if (!success) {
	console.error(error.format())
	process.exit(1)
}
