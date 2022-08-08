const { z } = require('zod')

const envSchema = z.object({
	DATABASE_URL2: z.string().url(),
})

const { success, error } = envSchema.safeParse(process.env)

if (!success) {
	console.error(
		'❌ Invalid environment variables:',
		JSON.stringify(error.format(), null, 4),
	)
	process.exit(1)
}
