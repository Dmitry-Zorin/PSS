import { Router } from 'express'
import { checkIfAdmin, createSafeHandler, uploadFile } from '../../../middleware'
import * as projections from '../../../projections'
import { Projection } from '../../../services/types'
import { createNotFoundError } from '../../../utils/errors'
import listParamsParser from './middleware/list-params-parser'

const resourceRouter = Router({ mergeParams: true })

resourceRouter.param('resource', (req, res, next, resource: string) => {
		const projection = (projections as Record<string, Projection>)[resource]
		
		if (!projection) {
			return next(createNotFoundError('Resource not found'))
		}
		
		res.locals.projection = {
			...projection,
			_id: 0,
			id: '$_id',
			createdAt: { $toDate: '$_id' },
			file: 1,
		}
		
		next()
	},
)

resourceRouter.get('/:resource', listParamsParser, createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { resource } = req.params
	const { match = {}, sort = { _id: -1 }, skip = 0, limit = 50 } = res.locals
	
	const [{ total, documents }] = await db.getDocuments(resource, [
		{ $match: match },
		{ $sort: sort },
		{
			$facet: {
				count: [
					{ $count: 'total' },
				],
				documents: [
					{ $skip: skip },
					{ $limit: Math.min(limit, 50) },
					{ $project: res.locals.projection },
				],
			},
		},
		{
			$project: {
				total: { $ifNull: [{ $arrayElemAt: ['$count.total', 0] }, 0] },
				documents: 1,
			},
		},
	])
	
	const range = `${resource} ${skip}-${Math.min(limit, total)}/${total}`
	res.set('content-range', range).json(documents)
}))

resourceRouter.get('/:resource/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { resource, id } = req.params
	res.json(await db.getDocument(resource, id, res.locals.projection))
}))

resourceRouter.use(checkIfAdmin)

resourceRouter.post('/:resource', uploadFile, createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { projection } = res.locals
	const { params: { resource }, body } = req
	const { id } = await db.addDocument(resource, body, projection)
	res.status(201).json({ id })
}))

resourceRouter.put('/:resource/:id', uploadFile, createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { projection } = res.locals
	const { params: { resource, id }, body } = req
	res.locals.fileToRemove = await db.updateDocument(resource, id, body, projection)
	res.json({ id })
}))

resourceRouter.delete('/:resource/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { resource, id } = req.params
	res.locals.fileToRemove = await db.deleteDocument(resource, id)
	res.sendStatus(200)
}))

export default resourceRouter
