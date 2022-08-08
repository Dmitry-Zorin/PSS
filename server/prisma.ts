import { PrismaClient } from '@prisma/client'

declare global {
	var prisma: PrismaClient | undefined
}

function createPrismaClient() {
	const client = new PrismaClient({
		log:
			process.env.NODE_ENV === 'production'
				? ['error']
				: [
						'query',
						'info',
						'warn',
						'error',
						{
							emit: 'event',
							level: 'query',
						},
				  ],
	})

	client.$on('query', async (e) => {
		console.log(`finished in ${e.duration}ms (params: ${e.params})`)
	})

	if (process.env.NODE_ENV !== 'production') {
		global.prisma = client
	}

	return client
}

export default global.prisma || createPrismaClient()
