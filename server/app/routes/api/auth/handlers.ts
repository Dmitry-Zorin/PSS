import { Request, Response } from 'express'
import { createBadRequestError, createUnauthorizedError } from '../../../../errors'

const userCollection = 'users'

const getFilter = (user: { username: string }) => (
	{ username: user.username }
)

export const register = async (req: Request, res: Response) => {
	const { encryption, db, token: tokenService } = res.app.services
	const { username } = req.body
	const password = await encryption.hash(req.body.password)
	
	if (!username || !password) {
		throw createBadRequestError('Invalid username or password')
	}
	
	const isAdmin = false
	const user = { username, password, isAdmin }
	await db.addDocument(userCollection, user)
	
	const token = tokenService.sign({ username, isAdmin })
	res.status(201).json({ token })
}

export const login = async (req: Request, res: Response) => {
	const { db, encryption, token } = res.app.services
	const { username, password } = req.body
	
	if (!username || !password) {
		throw createBadRequestError('Missing username or password')
	}
	
	const projection = { password: 1, isAdmin: 1 } as const
	const user = await db.getDocument(userCollection, { username }, projection)
	
	if (!user) {
		throw createUnauthorizedError('Incorrect username')
	}
	
	if (!await encryption.compare(password, user.password)) {
		throw createUnauthorizedError('Incorrect password')
	}
	
	const payload = { username, isAdmin: user.isAdmin }
	res.json({ token: token.sign(payload) })
}

export const checkAuth = (req: Request, res: Response) => {
	res.sendStatus(204)
}

export const checkPermissions = (req: Request, res: Response) => {
	res.json({ isAdmin: res.locals.user.isAdmin })
}

export const getIdentity = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { user } = res.locals
	const projection = { username: 1, isAdmin: 1, locale: 1, theme: 1 } as const
	res.json(await db.getDocument(userCollection, getFilter(user), projection))
}

export const updateIdentity = async (req: Request, res: Response) => {
	const { db, encryption } = res.app.services
	const { user } = res.locals
	
	const password = await encryption.hash(req.body.password)
	const payload = { ...req.body, password }
	const projection = { username: 1, password: 1, locale: 1, theme: 1 } as const
	await db.updateDocument(userCollection, getFilter(user), payload, projection)
	res.sendStatus(200)
}

export const deleteIdentity = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { user } = res.locals
	await db.deleteDocument(userCollection, getFilter(user))
	res.sendStatus(200)
}
