import { createRouter } from 'server/createRouter'

const authorRouter = createRouter()
	.query('list', {
		// input: publicationQuerySchema,
		async resolve({ input }) {
			// return findPublications(input)
		},
	})
	.query('one', {
		// input: publicationIdSchema,
		async resolve({ input }) {
			// return findPublication(input.id)
		},
	})
	.mutation('create', {
		// input: createPublicationSchema,
		async resolve({ input }) {
			// return createPublication(input)
		},
	})
	.mutation('update', {
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
