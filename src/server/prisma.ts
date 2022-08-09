import { PrismaClient } from '@prisma/client'

declare global {
	var _prisma: PrismaClient | undefined
}

function createPrismaClient() {
	const prisma = new PrismaClient({
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

	prisma.$on('query', async (e) => {
		console.log(`finished in ${e.duration}ms (params: ${e.params})`)
	})

	if (process.env.NODE_ENV !== 'production') {
		global._prisma = prisma
	}

	return prisma
}

export default global._prisma || createPrismaClient()
