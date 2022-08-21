import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { deleteAuthor, findAuthor, updateAuthor } from 'server/services/author'
import handleError from 'server/services/handleError'
import { updateAuthorSchema } from 'validations/author'
import { idSchema } from 'validations/common'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const { id } = idSchema.parse(req.query)
		res.json(await findAuthor(id))
	})
	.put(async (req, res) => {
		const data = updateAuthorSchema.parse(req.body)
		const record = await updateAuthor(data)
		res.revalidate(`/authors/${record.id}`)
		res.json(record)
	})
	.delete(async (req, res) => {
		const { id } = idSchema.parse(req.query)
		const record = await deleteAuthor(id)
		res.revalidate(`/authors/${record.id}`)
		res.json(record)
	})
	.handler({
		onError: handleError,
	})
