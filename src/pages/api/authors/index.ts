import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { createAuthor, findAuthors } from 'server/services/author'
import handleError from 'server/services/handleError'
import { parseBody, parseQuery } from 'utils/parsers'
import { createAuthorSchema, getAuthorsSchema } from 'validations/author'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const query = parseQuery(getAuthorsSchema, req.query)
		res.json(await findAuthors(query))
	})
	.post(async (req, res) => {
		const body = parseBody(createAuthorSchema, req.body)
		res.json(await createAuthor(body))
	})
	.handler({
		onError: handleError,
	})
