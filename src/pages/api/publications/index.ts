import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import handleError from 'server/services/handleError'
import {
	createPublication,
	findPublications,
} from 'server/services/publication'
import { parseBody, parseQuery } from 'utils/parsers'
import {
	createPublicationSchema,
	getPublicationsSchema,
} from 'validations/publication'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const filters = parseQuery(getPublicationsSchema, req.query)
		res.json(await findPublications(filters))
	})
	.post(async (req, res) => {
		const data = parseBody(createPublicationSchema, req.body)
		await Promise.all(
			data.authorIds.flatMap((id) => [
				res.revalidate(`/authors/${id}`),
				res.revalidate(`/en/authors/${id}`),
			]),
		)
		res.json(await createPublication(data))
	})
	.handler({
		onError: handleError,
	})
