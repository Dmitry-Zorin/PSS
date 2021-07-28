import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { generatePassword, isCorrectPassword } from '../../../../utils'
import { createBadRequestError, createEnvError, createUnauthorizedError } from '../../../../errors'

const userCollection = 'users'

const generateToken = (username: string, isAdmin: boolean) => {
	const key = process.env.SECRET_KEY
	if (!key) {
		throw createEnvError('secret_key')
	}
	const payload = { username, isAdmin }
	const options = { expiresIn: 31536000 }
	return jwt.sign(payload, key, options)
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
	const { username, password: originalPassword } = req.body
	const password = await generatePassword(originalPassword)
	
	if (!username || !password) {
		return next(createBadRequestError('Invalid username or password'))
	}
	
	const isAdmin = false
	const user = { username, password, isAdmin }
	await res.app.dbService.addDocument(userCollection, user)
	const token = generateToken(username, isAdmin)
	res.status(201).json({ token })
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body
	
	if (!username || !password) {
		return next(createBadRequestError('Missing username or password'))
	}
	
	const projection = { password: 1, isAdmin: 1 } as const
	const user = await res.app.dbService.getDocument(userCollection, { username }, projection)
	
	if (!user) {
		return next(createUnauthorizedError('Incorrect username'))
	}
	
	if (!await isCorrectPassword(password, user.password)) {
		return next(createUnauthorizedError('Incorrect password'))
	}
	
	res.json({ token: generateToken(username, user.isAdmin) })
}

export const checkAuth = (req: Request, res: Response) => {
	res.sendStatus(204)
}

export const checkPermissions = (req: Request, res: Response) => {
	res.json({ isAdmin: res.locals.user?.isAdmin })
}

export const getIdentity = async (req: Request, res: Response) => {
	const { username } = res.locals.user
	const projection = {
		username: 1,
		isAdmin: 1,
		locale: 1,
		theme: 1,
	} as const
	
	res.json(await res.app.dbService.getDocument(userCollection, { username }, projection))
}

export const updateIdentity = async (req: Request, res: Response) => {
	const { username, password: originalPassword, locale, theme } = req.body
	const password = await generatePassword(originalPassword)
	const payload = { username, password, locale, theme }
	
	await res.app.dbService.updateDocument(userCollection, { username: res.locals.user }, payload)
	res.sendStatus(200)
}

export const deleteIdentity = async (req: Request, res: Response) => {
	const { username } = res.locals.user
	await res.app.dbService.deleteDocument(userCollection, { username })
	res.sendStatus(200)
}
