import { createRouter } from 'server/createRouter'

const authorRouter = createRouter()
	.query('all', {
		// input: publicationQuerySchema,
		async resolve({ input }) {
			// return findPublications(input)
		},
	})
	.query('byId', {
		// input: publicationIdSchema,
		async resolve({ input }) {
			// return findPublication(input.id)
		},
	})
	.mutation('add', {
		// input: createPublicationSchema,
		async resolve({ input }) {
			// return createPublication(input)
		},
	})
	.mutation('edit', {
		// input: updatePublicationSchema,
		async resolve({ input }) {
			// return updatePublication(input)
		},
	})
	.mutation('delete', {
		// input: publicationIdSchema,
		async resolve({ input }) {
			// return deletePublication(input.id)
		},
	})

export default authorRouter
