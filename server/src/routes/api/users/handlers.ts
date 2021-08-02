import { NextFunction, Request, Response } from 'express'
import { isBoolean } from 'lodash'
import { createBadRequestError } from '../../../utils/errors'

const projection = {
	_id: 0,
	id: '$username',
	username: 1,
	isAdmin: 1,
} as const

export const setFilter = (req: Request, res: Response, next: NextFunction, id: string) => {
	res.locals.filter = { username: id }
}

export const create = async (req: Request, res: Response) => {
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
}

export const getList = async (req: Request, res: Response) => {
	res.locals.projection = projection
	await getList(req, res)
}

export const getOne = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { filter } = res.locals
	res.json(await db.getDocument('users', filter, projection))
}

export const update = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { filter } = res.locals
	const isAdmin = req.body.isAdmin
	
	if (!isBoolean(isAdmin)) {
		throw createBadRequestError('Parameter isAdmin must be boolean')
	}
	
	await db.updateDocument('users', filter, { isAdmin })
	res.sendStatus(200)
}

export const remove = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { filter } = res.locals
	await db.deleteDocument('users', filter)
	res.sendStatus(200)
}
