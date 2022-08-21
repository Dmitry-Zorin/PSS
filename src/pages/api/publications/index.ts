import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import handleError from 'server/services/handleError'
import {
	createPublication,
	findPublications,
} from 'server/services/publication'
import {
	createPublicationSchema,
	getPublicationsSchema,
} from 'validations/publication'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const filters = getPublicationsSchema.parse(req.query)
		res.json(await findPublications(filters))
	})
	.post(async (req, res) => {
		const data = createPublicationSchema.parse(req.body)
		res.json(await createPublication(data))
	})
	.handler({
		onError: handleError,
	})
