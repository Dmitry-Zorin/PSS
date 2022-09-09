import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { deleteAuthor, findAuthor, updateAuthor } from 'server/services/author'
import handleError from 'server/services/handleError'
import { parseBody, parseId } from 'utils/parsers'
import { updateAuthorSchema } from 'validations/author'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const id = parseId(req.query)
		res.json(await findAuthor(id))
	})
	.put(async (req, res) => {
		const id = parseId(req.query)
		const body = parseBody(updateAuthorSchema, req.body)
		const record = await updateAuthor(id, body)
		await Promise.all([
			res.revalidate(`/authors/${id}`),
			res.revalidate(`/en/authors/${id}`),
			...record.publications.flatMap(({ id, category }) => [
				res.revalidate(`/publications/${category}/${id}`),
				res.revalidate(`/en/publications/${category}/${id}`),
			]),
		])
		res.json(record)
	})
	.delete(async (req, res) => {
		const id = parseId(req.query)
		const record = await deleteAuthor(id)
		await Promise.all([
			res.revalidate(`/authors/${id}`),
			res.revalidate(`/en/authors/${id}`),
			...record.publications.flatMap(({ id, category }) => [
				res.revalidate(`/publications/${category}/${id}`),
				res.revalidate(`/en/publications/${category}/${id}`),
			]),
		])
		res.json(record)
	})
	.handler({
		onError: handleError,
	})
