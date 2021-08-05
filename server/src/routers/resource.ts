import { Router } from 'express'
import { createNotFoundError } from '../helpers/errors'
import {
	checkIfAdmin,
	createSafeHandler,
	listParamsParser,
	removeFile,
	uploadFile,
} from '../middleware'
import createPaginationPipeline from '../pipelines/pagination'
import * as projections from '../projections'

const resourceRouter = Router({ mergeParams: true })

resourceRouter.param('resource', (req, res, next, resource: string) => {
	const projection = (projections as Record<string, any>)[resource]
	
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
})

resourceRouter.get('/:resource', listParamsParser, createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { resource } = req.params
	const { listParams, projection } = res.locals
	
	const options = { ...listParams, projection }
	const pipeline = createPaginationPipeline(options)
	const [{ total, documents }] = await db.getDocuments(resource, pipeline)
	
	const { skip, limit } = listParams
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

resourceRouter.use(removeFile)

export default resourceRouter
