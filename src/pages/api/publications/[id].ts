import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import handleError from 'server/services/handleError'
import {
	deletePublication,
	findPublication,
	updatePublication,
} from 'server/services/publication'
import { idSchema } from 'validations/common'
import { updatePublicationSchema } from 'validations/publication'

export default createRouter<NextApiRequest, NextApiResponse>()
	.get(async (req, res) => {
		const { id } = idSchema.parse(req.query)
		res.json(await findPublication(id))
	})
	.put(async (req, res) => {
		const data = updatePublicationSchema.parse(req.body)
		const record = await updatePublication(idSchema.parse(req.query).id, data)
		res.revalidate(`/publications/${record.category}/${record.id}`)
		res.json(record)
	})
	.delete(async (req, res) => {
		const { id } = idSchema.parse(req.query)
		const record = await deletePublication(id)
		res.revalidate(`/publications/${record.category}/${record.id}`)
		res.json(record)
	})
	.handler({
		onError: handleError,
	})
