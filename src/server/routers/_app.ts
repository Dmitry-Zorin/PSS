import { createRouter } from 'server/createRouter'
import superjson from 'superjson'
import authorRouter from './author'
import publicationRouter from './publication'

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('author.', authorRouter)
	.merge('publication.', publicationRouter)

export type AppRouter = typeof appRouter
