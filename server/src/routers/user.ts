import { NextFunction, Request, Response, Router } from 'express'
import { isBoolean } from 'lodash'
import { checkIfAdmin, createSafeHandler } from '../middleware'
import { createBadRequestError } from '../utils/errors'

const projection = {
	_id: 0,
	id: '$username',
	username: 1,
	isAdmin: 1,
} as const

export const setFilter = (req: Request, res: Response, next: NextFunction, id: string) => {
	res.locals.filter = { username: id }
}

const userRouter = Router({ mergeParams: true })

userRouter.use(checkIfAdmin)

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
	await db.addDocument('users', document)
	
	res.status(201).json({ id: username })
}))

// userRouter.get('/', listParamsParser, createSafeHandler(async (req, res) => {
// res.locals.projection = projection
// await getList(req, res)
// }))

userRouter.get('/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	res.json(await db.getDocument('users', filter, projection))
}))

userRouter.put('/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	const isAdmin = req.body.isAdmin
	
	if (!isBoolean(isAdmin)) {
		throw createBadRequestError('Parameter isAdmin must be boolean')
	}
	
	await db.updateDocument('users', filter, { isAdmin })
	res.sendStatus(200)
}))

userRouter.delete('/:id', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const { filter } = res.locals
	await db.deleteDocument('users', filter)
	res.sendStatus(200)
}))

export default userRouter
