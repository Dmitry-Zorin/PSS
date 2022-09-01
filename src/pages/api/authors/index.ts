import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { createAuthor, findAuthors } from 'server/services/author'
import handleError from 'server/services/handleError'
import { authorFormSchema, getAuthorsSchema } from 'validations/author'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const filters = getAuthorsSchema.parse(req.query)
		res.json(await findAuthors(filters))
	})
	.post(async (req, res) => {
		const data = authorFormSchema.parse(req.body)
		res.json(await createAuthor(data))
	})
	.handler({
		onError: handleError,
	})
