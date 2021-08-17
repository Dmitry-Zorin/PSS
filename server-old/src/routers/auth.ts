import { Router } from 'express'
import { BadRequestError, ConflictError, UnauthorizedError } from '../helpers/errors'
import { safeHandler } from '../middleware'
import { setFilter } from './user'

const collection = 'users'

const getFilter = (user: { username: string }) => (
	{ username: user.username }
)

const authRouter = Router({ mergeParams: true })

authRouter.param('id', setFilter)

authRouter.post('/register', safeHandler(async (req, res) => {
	const { crypt, db, jwt } = res.app.services
	const { username } = req.body
	const password = await crypt.hash(req.body.password)
	
	if (!username || !password) {
		throw BadRequestError('Invalid username or password')
	}
	
	const isAdmin = false
	const user = { username, password, isAdmin }
	
	await db.addDocument(collection, user).catch(err => {
		throw err?.code === 11000 ? ConflictError('Username is taken') : err
	})
	
	const token = jwt.sign({ username, isAdmin })
	res.status(201).json({ token })
}))

authRouter.post('/login', safeHandler(async (req, res) => {
	const { db, crypt, jwt } = res.app.services
	const { username, password } = req.body
	
	if (!username || !password) {
		throw BadRequestError('Missing username or password')
	}
	
	const projection = { password: 1, isAdmin: 1 } as const
	const user = await db.getDocument(collection, { username }, projection)
	
	if (!user) {
		throw UnauthorizedError('Incorrect username')
	}
	
	if (!await crypt.compare(password, user.password)) {
		throw UnauthorizedError('Incorrect password')
	}
	
	const payload = { username, isAdmin: user.isAdmin }
	res.json({ token: jwt.sign(payload) })
}))

authRouter.get('/', safeHandler((req, res) => {
	res.sendStatus(204)
}))

authRouter.get('/permissions', safeHandler((req, res) => {
	res.json({ isAdmin: req.user.isAdmin })
}))

authRouter.get('/identity', safeHandler(async (req, res) => {
	const { db } = res.app.services
	const projection = { username: 1, isAdmin: 1, locale: 1, theme: 1 } as const
	res.json(await db.getDocument(collection, getFilter(req.user), projection))
}))

authRouter.put('/identity', safeHandler(async (req, res) => {
	const { db, crypt } = res.app.services
	const password = await crypt.hash(req.body.password)
	const payload = { ...req.body, password }
	const projection = { password: 1, locale: 1, theme: 1 } as const
	await db.updateDocument(collection, getFilter(req.user), payload, projection)
	res.sendStatus(200)
}))

authRouter.delete('/identity', safeHandler(async (req, res) => {
	const { db } = res.app.services
	await db.deleteDocument(collection, getFilter(req.user))
	res.sendStatus(200)
}))

export default authRouter
