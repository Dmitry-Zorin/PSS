import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import handleError from 'server/services/handleError'
import {
	deletePublication,
	findPublication,
	updatePublication,
} from 'server/services/publication'
import {
	publicationIdSchema,
	updatePublicationSchema,
} from 'validations/publication'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const { id } = publicationIdSchema.parse(req.query)
		res.json(await findPublication(id))
	})
	.put(async (req, res) => {
		const data = updatePublicationSchema.parse(req.body)
		res.json(await updatePublication(data))
	})
	.delete(async (req, res) => {
		const { id } = publicationIdSchema.parse(req.query)
		res.json(await deletePublication(id))
	})
	.handler({
		onError: handleError,
	})
