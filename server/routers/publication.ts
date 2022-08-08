import {
	createPublicationSchema,
	publicationFiltersSchema,
	publicationIdSchema,
	updatePublicationSchema,
} from 'validations/publication'
import { createRouter } from 'server/createRouter'
import {
	createPublication,
	deletePublication,
	findPublication,
	findPublications,
	updatePublication,
} from 'server/services/publication'

const publicationRouter = createRouter()
	.query('list', {
		input: publicationFiltersSchema,
		async resolve({ input }) {
			return findPublications(input)
		},
	})
	.query('one', {
		input: publicationIdSchema,
		async resolve({ input }) {
			return findPublication(input.id)
		},
	})
	.mutation('create', {
		input: createPublicationSchema,
		async resolve({ input }) {
			return createPublication(input)
		},
	})
	.mutation('update', {
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
