import { NextFunction, Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import { isEmpty } from 'lodash'
import { db } from '../db'
import { generatePassword, isCorrectPassword, removeFalsyProps } from '../utils'
import { createBadRequestError, createConflictError, createEnvError, createUnauthorizedError } from '../errors'

const generateToken = (username: string, isAdmin: boolean) => {
	const key = process.env.SECRET_KEY
	if (!key) {
		throw createEnvError('secret_key')
	}
	const payload = { username, isAdmin }
	const options = { expiresIn: 31536000 }
	return jwt.sign(payload, key, options)
}

const users = db.collection('users')
const router = Router({ mergeParams: true })

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
	let { username, password } = req.body
	
	password = await generatePassword(password)
	
	if (!username || !password) {
		return next(createBadRequestError('Invalid username or password'))
	}
	
	try {
		const isAdmin = false
		await users.insertOne({ username, password, isAdmin })
		res.status(201).json({
			token: generateToken(username, isAdmin),
		})
	}
	catch (err) {
		if (err.name === 'MongoError' && err.code === 11000) {
			return next(createConflictError('User already exists'))
		}
		next(err)
	}
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body
	
	if (!username || !password) {
		return next(createBadRequestError('Missing username or password'))
	}
	
	const user = await users.findOne({ username })
	
	if (!user) {
		return next(createUnauthorizedError('Incorrect username'))
	}
	
	if (!await isCorrectPassword(password, user.password)) {
		return next(createUnauthorizedError('Incorrect password'))
	}
	
	try {
		res.json({ token: generateToken(username, user.isAdmin) })
	}
	catch (err) {
		next(err)
	}
})

router.get('/', (req: Request, res: Response) => {
	res.sendStatus(204)
})

router.get('/permissions', (req: Request, res: Response) => {
	res.json({ isAdmin: req.user?.isAdmin })
})

router.get('/identity', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, isAdmin, locale, theme } = await users.findOne({ username: req.user?.username })
		res.json({ fullName: username, isAdmin, locale, theme })
	}
	catch (err) {
		next(err)
	}
})

router.put('/identity', async (req: Request, res: Response) => {
	let { username, password, locale, theme } = req.body
	
	password = await generatePassword(password)
	const payload = removeFalsyProps({ username, password, locale, theme })
	
	if (!isEmpty(payload)) {
		await users.updateOne({ username: req.user?.username }, { $set: payload })
	}
	
	res.sendStatus(200)
})

router.delete('/identity', async (req: Request, res: Response) => {
	await users.deleteOne({ username: req.user?.username })
	res.sendStatus(200)
})

export default router
