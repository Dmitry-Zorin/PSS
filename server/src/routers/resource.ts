import { Router } from 'express'
import { mapValues } from 'lodash'
import { createNotFoundError } from '../helpers/errors'
import { adminChecker, fileUploader, listParamsParser, safeHandler } from '../middleware'
import getPaginationPipeline from '../pipelines/pagination'
import * as projections from '../projections'

const { SERVER } = process.env

const projectionExtension = {
	_id: 0,
	id: '$_id',
	createdAt: {
		$toDate: '$_id',
	},
	file: 1,
}

const extendedProjections: Record<string, any> = (
	mapValues(projections, (projection) => (
		{ ...projection, ...projectionExtension }
	))
)

const resourceRouter = Router({ mergeParams: true })

resourceRouter.param('resource', (req, res, next, resource: string) => {
	const projection = extendedProjections[resource]
	if (!projection) {
		return next(createNotFoundError('Resource not found'))
	}
	res.locals.projection = projection
	next()
})

resourceRouter.get('/:resource', listParamsParser(), safeHandler(async (req, res) => {
	const { db } = res.app.services
	const { resource } = req.params
	const { listParams, projection } = res.locals
	
	const options = { ...listParams, projection }
	const pipeline = getPaginationPipeline(options)
	const [{ total, documents }] = await db.getDocuments(resource, pipeline)
	
	const { skip, limit } = listParams
	const range = `${resource} ${skip}-${Math.min(limit, total)}/${total}`
	res.set('content-range', range).json(documents)
}))

resourceRouter.get('/:resource/:id', safeHandler(async (req, res) => {
	const { db, crypt } = res.app.services
	const { resource, id } = req.params
	const { file, ...doc } = await db.getDocument(resource, id, res.locals.projection)
	
	if (!file) return res.json(doc)
	
	const filekey = await crypt.hash(file.id)
	const url = `${SERVER}/files/${resource}/${file.id}?filekey=${filekey}`
	res.json({ ...doc, file: { ...file, url } })
}))

resourceRouter.use(adminChecker())

resourceRouter.post('/:resource', fileUploader(), safeHandler(async (req, res) => {
	const { db } = res.app.services
	const { projection } = res.locals
	const { params: { resource }, body } = req
	const { id } = await db.addDocument(resource, body, projection)
	res.status(201).json({ id })
}))

resourceRouter.put('/:resource/:id', fileUploader(), safeHandler(async (req, res) => {
	const { db, fs } = res.app.services
	const { projection } = res.locals
	const { params: { resource, id }, body } = req
	const fileId = await db.updateDocument(resource, id, body, projection)
	res.sendStatus(200)
	
	if (fileId) {
		await fs.delete(resource, fileId)
	}
}))

// resourceRouter.delete('/:resource', createSafeHandler(async (req, res) => {
// 	const { db, file } = res.app.services
// 	const { resource } = req.params
// 	const { ids } = req.query
// 	const fileIds = await db.deleteDocuments(resource, ids)
// 	file.removeMany(resource, fileIds)
// 	res.sendStatus(200)
// }))

resourceRouter.delete('/:resource/:id', safeHandler(async (req, res) => {
	const { db, fs } = res.app.services
	const { resource, id } = req.params
	const fileId = await db.deleteDocument(resource, id)
	res.sendStatus(200)
	
	if (fileId) {
		await fs.delete(resource, fileId)
	}
}))

export default resourceRouter
