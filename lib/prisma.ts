import { PrismaClient } from '@prisma/client'

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
	console.log(e.params)
	console.log(`finished in ${e.duration}ms`)
})

export default prisma
