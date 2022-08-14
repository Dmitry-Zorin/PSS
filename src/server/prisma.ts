import { PrismaClient } from '@prisma/client'
import { isProduction, isDevelopment } from './../utils/env'

declare global {
	var _prisma: PrismaClient | undefined
}

function createPrismaClient() {
	const prisma = new PrismaClient({
		log: isProduction
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

	if (isDevelopment) {
		global._prisma = prisma
	}

	return prisma
}

export default global._prisma || createPrismaClient()
