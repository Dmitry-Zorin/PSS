import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import handleError from 'server/services/handleError'
import {
	deletePublication,
	findPublication,
	updatePublication,
} from 'server/services/publication'
import { parseBody, parseId } from 'utils/parsers'
import { updatePublicationSchema } from 'validations/publication'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		res.json(await findPublication(parseId(req.query)))
	})
	.put(async (req, res) => {
		const id = parseId(req.query)
		const data = parseBody(updatePublicationSchema, req.body)
		const record = await updatePublication(id, data)
		await Promise.all([
			res.revalidate(`/publications/${record.category}/${id}`),
			res.revalidate(`/en/publications/${record.category}/${id}`),
			...data.authorIds.flatMap((id) => [
				res.revalidate(`/authors/${id}`),
				res.revalidate(`/en/authors/${id}`),
			]),
		])
		res.json(record)
	})
	.delete(async (req, res) => {
		const id = parseId(req.query)
		const record = await deletePublication(id)
		await Promise.all([
			res.revalidate(`/publications/${record.category}/${id}`),
			res.revalidate(`/en/publications/${record.category}/${id}`),
			...record.authorIds.flatMap((id) => [
				res.revalidate(`/authors/${id}`),
				res.revalidate(`/en/authors/${id}`),
			]),
		])
		res.json(record)
	})
	.handler({
		onError: handleError,
	})
