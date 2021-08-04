import { NextFunction, Request, Response, Router } from 'express'
import { isBoolean } from 'lodash'
import { checkIfAdmin, createSafeHandler, listParamsParser } from '../middleware'
import createPaginationPipeline from '../pipelines/pagination'
import { createBadRequestError } from '../utils/errors'

const collection = 'users'

const projection = {
	_id: 0,
	id: '$username',
	createdAt: { $toDate: '$_id' },
	username: 1,
	isAdmin: 1,
} as const

export const setFilter = (req: Request, res: Response, next: NextFunction, id: string) => {
	res.locals.filter = { username: id }
	next()
}

const userRouter = Router({ mergeParams: true })

userRouter.use(checkIfAdmin)

userRouter.param('id', setFilter)

userRouter.post('/', createSafeHandler(async (req, res) => {
	const { encryption, db } = res.app.services
	const { username, isAdmin } = req.body
	const password = await encryption.hash(req.body.password)
	
	if (!username || !password) {
		throw createBadRequestError('Missing username or password')
	}
	
	if (!isBoolean(isAdmin)) {
		throw createBadRequestError('Parameter isAdmin must be boolean')
	}
	
	const document = { username, password, isAdmin }
	await db.addDocument(collection, document)
	
	res.status(201).json({ id: username })
}))

userRouter.get('/', listParamsParser, createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { listParams } = res.locals
	
	const options = { ...listParams, projection }
	const pipeline = createPaginationPipeline(options)
	const [{ total, documents }] = await db.getDocuments(collection, pipeline)
	
	const { skip, limit } = listParams
	const range = `${collection} ${skip}-${Math.min(limit, total)}/${total}`
	res.set('content-range', range).json(documents)
}))

userRouter.get('/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	res.json(await db.getDocument(collection, filter, projection))
}))

userRouter.put('/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	const isAdmin = req.body.isAdmin
	
	if (!isBoolean(isAdmin)) {
		throw createBadRequestError('Parameter isAdmin must be boolean')
	}
	
	await db.updateDocument(collection, filter, { isAdmin })
	res.sendStatus(200)
}))

userRouter.delete('/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	await db.deleteDocument(collection, filter)
	res.sendStatus(200)
}))

export default userRouter
