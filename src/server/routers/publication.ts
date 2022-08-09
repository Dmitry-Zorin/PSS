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
		async resolve({ input, ctx }) {
			const record = await updatePublication(input)
			await ctx?.revalidate?.(`/publications/${record.category}/${record.id}`)
			return record
		},
	})
	.mutation('delete', {
		input: publicationIdSchema,
		async resolve({ input, ctx }) {
			const record = await deletePublication(input.id)
			try {
				await ctx?.revalidate?.(`/publications/${record.category}/${record.id}`)
			} catch (e) {
				console.log('failed!')
			}
			console.log(`/publications/${record.category}/${record.id}`)
			return record
		},
	})

export default publicationRouter
