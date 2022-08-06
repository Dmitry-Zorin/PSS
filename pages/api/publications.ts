import { Publication } from '@prisma/client'
import { publicationQuerySchema, publicationSchema } from 'constants/validation'
import { createHandler } from 'lib/api'
import { getPublication, getPublications } from 'lib/api/services/publications'
import { NextApiResponse } from 'next'
import { withValidation } from 'next-validations'
import { GetListResponse } from 'types'

const validatePublicationQuery = withValidation({
	schema: publicationQuerySchema,
	type: 'Zod',
	mode: 'query',
})

const validatePublication = withValidation({
	schema: publicationSchema,
	type: 'Zod',
	mode: 'body',
})

const handler = createHandler()

handler.get(
	validatePublicationQuery(),
	async (
		req,
		res: NextApiResponse<Publication | GetListResponse<Publication>>,
	) => {
		const query = publicationQuerySchema.parse(req.query)

		if (query.id) {
			return res.json(await getPublication(query.id))
		}

		res.json(await getPublications(query))
	},
)

handler.post(
	validatePublication(),
	async (req, res: NextApiResponse<Publication>) => {
		res.json(req.body)
	},
)

export default handler
