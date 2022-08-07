import { Publication } from '@prisma/client'
import {
	createPublicationSchema,
	publicationQuerySchema,
	updatePublicationSchema,
} from 'constants/validation'
import { createHandler } from 'lib/api'
import {
	createPublication,
	deletePublication,
	findPublication,
	findPublications,
	updatePublication,
} from 'lib/api/services/publications'
import { NextApiResponse } from 'next'
import { withValidation } from 'next-validations'
import { GetListResponse } from 'types'

const handler = createHandler()

handler.get(
	withValidation({
		schema: publicationQuerySchema,
		type: 'Zod',
		mode: 'query',
	})(),
	async (
		req,
		res: NextApiResponse<Publication | GetListResponse<Publication>>,
	) => {
		const query = publicationQuerySchema.parse(req.query)

		if (query.id) {
			return res.json(await findPublication(query.id))
		}

		res.json(await findPublications(query))
	},
)

handler.post(
	withValidation({
		schema: createPublicationSchema,
		type: 'Zod',
		mode: 'body',
	})(),
	async (req, res: NextApiResponse<Publication>) => {
		res.json(await createPublication(req.body))
	},
)

handler.put(
	withValidation({
		schema: updatePublicationSchema,
		type: 'Zod',
		mode: 'body',
	})(),
	async (req, res: NextApiResponse<Publication>) => {
		res.json(await updatePublication(req.body))
	},
)

handler.delete(async (req, res: NextApiResponse<Publication>) => {
	res.json(await deletePublication(+req.body.id))
})

export default handler
