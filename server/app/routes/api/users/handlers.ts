import { Request, Response } from 'express'
import { createBadRequestError } from '../../../../errors'
import { generatePassword } from '../../../../utils'
import { isBoolean } from 'lodash'

const projection = {
	_id: 0,
	id: '$username',
	username: 1,
	isAdmin: 1,
} as const

export const create = async (req: Request, res: Response) => {
	const { username, password: originalPassword, isAdmin } = req.body
	const password = await generatePassword(originalPassword)
	
	if (!username || !password) {
		throw createBadRequestError('Missing username or password')
	}
	
	if (!isBoolean(isAdmin)) {
		throw createBadRequestError('Parameter isAdmin must be boolean')
	}
	
	await res.app.dbService.addDocument('users', { username, password, isAdmin })
	res.status(201).json({ id: username })
}

export const getList = async (req: Request, res: Response) => {
	res.locals.projection = projection
	await getList(req, res)
}

export const getOne = async (req: Request, res: Response) => {
	const filter = { username: req.params.id }
	res.json(await res.app.dbService.getDocument('users', filter, projection))
}

export const update = async (req: Request, res: Response) => {
	const filter = { username: req.params.id }
	const isAdmin = req.body.isAdmin
	
	if (!isBoolean(isAdmin)) {
		throw createBadRequestError('Parameter isAdmin must be boolean')
	}
	
	await res.app.dbService.updateDocument('users', filter, { isAdmin })
	res.sendStatus(200)
}

export const remove = async (req: Request, res: Response) => {
	const filter = { username: req.params.id }
	await res.app.dbService.deleteDocument('users', filter)
	res.sendStatus(200)
}
