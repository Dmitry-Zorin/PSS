import { createRouter } from 'server/createRouter'
import {
	createPublication,
	deletePublication,
	findPublication,
	findPublications,
	updatePublication,
} from 'server/services/publication'
import {
	createPublicationSchema,
	publicationFiltersSchema,
	publicationIdSchema,
	updatePublicationSchema,
} from 'validations/publication'

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
			const record = await updatePublication(input)
			return record
		},
	})
	.mutation('delete', {
		input: publicationIdSchema,
		async resolve({ input }) {
			const record = await deletePublication(input.id)
			return record
		},
	})

export default publicationRouter
