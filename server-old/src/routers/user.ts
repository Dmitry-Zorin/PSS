import { NextFunction, Request, Response, Router } from 'express'
import { isBoolean } from 'lodash'
import { BadRequestError } from '../helpers/errors'
import { adminChecker, listParamsParser, safeHandler } from '../middleware'
import getPaginationPipeline from '../pipelines/pagination'

const collection = 'users'

const projection = {
	_id: 0,
	id: {
		$toString: '$username',
	},
	createdAt: {
		$toDate: '$_id',
	},
	username: 1,
	isAdmin: 1,
} as const

export const setFilter = (req: Request, res: Response, next: NextFunction, id: string) => {
	res.locals.filter = { username: id }
	next()
}

const userRouter = Router({ mergeParams: true })

userRouter.use(adminChecker())

userRouter.param('id', setFilter)

userRouter.post('/', safeHandler(async (req, res) => {
	const { crypt, db } = res.app.services
	const { username, isAdmin } = req.body
	const password = await crypt.hash(req.body.password)
	
	if (!username || !password) {
		throw BadRequestError('Missing username or password')
	}
	
	if (!isBoolean(isAdmin)) {
		throw BadRequestError('Parameter isAdmin must be boolean')
	}
	
	const document = { username, password, isAdmin }
	await db.addDocument(collection, document)
	
	res.status(201).json({ id: username })
}))

userRouter.get('/', listParamsParser(), safeHandler(async (req, res) => {
	const { db } = res.app.services
	const { listParams } = res.locals
	
	const options = { ...listParams, projection }
	const pipeline = getPaginationPipeline(options)
	const [{ total, documents }] = await db.getDocuments(collection, pipeline)
	
	const { skip, limit } = listParams
	const range = `${collection} ${skip}-${Math.min(limit, total)}/${total}`
	res.set('content-range', range).json(documents)
}))

userRouter.get('/:id', safeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	res.json(await db.getDocument(collection, filter, projection))
}))

userRouter.put('/:id', safeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	const isAdmin = req.body.isAdmin
	
	if (!isBoolean(isAdmin)) {
		throw BadRequestError('Parameter isAdmin must be boolean')
	}
	
	await db.updateDocument(collection, filter, { isAdmin })
	res.sendStatus(200)
}))

userRouter.delete('/:id', safeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	await db.deleteDocument(collection, filter)
	res.sendStatus(200)
}))

export default userRouter
