import {
	createPublicationSchema,
	publicationIdSchema,
	publicationQuerySchema,
	updatePublicationSchema,
} from 'validations/publication'
import { createRouter } from 'server/createRouter'
import {
	createPublication,
	deletePublication,
	findPublication,
	findPublications,
	updatePublication,
} from 'server/services/publications'

const publicationRouter = createRouter()
	.query('all', {
		input: publicationQuerySchema,
		async resolve({ input }) {
			return findPublications(input)
		},
	})
	.query('byId', {
		input: publicationIdSchema,
		async resolve({ input }) {
			return findPublication(input.id)
		},
	})
	.mutation('add', {
		input: createPublicationSchema,
		async resolve({ input }) {
			return createPublication(input)
		},
	})
	.mutation('edit', {
		input: updatePublicationSchema,
		async resolve({ input }) {
			return updatePublication(input)
		},
	})
	.mutation('delete', {
		input: publicationIdSchema,
		async resolve({ input }) {
			return deletePublication(input.id)
		},
	})

export default publicationRouter
