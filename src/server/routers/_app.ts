import { createRouter } from 'server/createRouter'
import prisma from 'server/prisma'
import superjson from 'superjson'
import authorRouter from './author'
import publicationRouter from './publication'

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('author.', authorRouter)
	.merge('publication.', publicationRouter)
	.mutation('preconnect', { resolve: () => prisma.$connect() })

export type AppRouter = typeof appRouter
