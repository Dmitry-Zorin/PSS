import { Router } from 'express'
import { createSafeHandler } from '../../middleware'
import { createBadRequestError, createUnauthorizedError } from '../../utils/errors'
import { setFilter } from './users-router'

const userCollection = 'users'

const getFilter = (user: { username: string }) => (
	{ username: user.username }
)

const authRouter = Router({ mergeParams: true })

authRouter.param('id', setFilter)

authRouter.post('/register', createSafeHandler(async (req, res) => {
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
}))

authRouter.post('/login', createSafeHandler(async (req, res) => {
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
}))

authRouter.get('/', createSafeHandler((req, res) => {
	res.sendStatus(204)
}))

authRouter.get('/permissions', createSafeHandler((req, res) => {
	res.json({ isAdmin: req.user.isAdmin })
}))

authRouter.get('/identity', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	const projection = { username: 1, isAdmin: 1, locale: 1, theme: 1 } as const
	res.json(await db.getDocument(userCollection, getFilter(req.user), projection))
}))

authRouter.put('/identity', createSafeHandler(async (req, res) => {
	const { db, encryption } = res.app.services
	const password = await encryption.hash(req.body.password)
	const payload = { ...req.body, password }
	const projection = { username: 1, password: 1, locale: 1, theme: 1 } as const
	await db.updateDocument(userCollection, getFilter(req.user), payload, projection)
	res.sendStatus(200)
}))

authRouter.delete('/identity', createSafeHandler(async (req, res) => {
	const { db } = res.app.services
	await db.deleteDocument(userCollection, getFilter(req.user))
	res.sendStatus(200)
}))

export default authRouter
