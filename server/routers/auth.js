import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'
import { BadRequestError, ConflictError, UnauthorizedError } from '../errors.js'
import { generatePassword, isCorrectPassword, removeFalsyProps } from '../utils.js'

const generateToken = (username, isAdmin) => {
	const payload = { username, isAdmin }
	const options = { expiresIn: 31536000 }
	return jwt.sign(payload, process.env.SECRET_KEY, options)
}

const users = db.collection('users')
const router = Router({ mergeParams: true })

router.post('/register', async (req, res, next) => {
	let { username, password } = req.body
	
	password = await generatePassword(password)
	
	if (!username || !password) {
		return next(new BadRequestError('Invalid username or password'))
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
			err = new ConflictError('User already exists')
		}
		next(err)
	}
})

router.post('/login', async (req, res, next) => {
	const { username, password } = req.body
	
	if (!username || !password) {
		return next(new BadRequestError('Missing username or password'))
	}
	
	const user = await users.findOne({ username })
	
	if (!user) {
		return next(new UnauthorizedError('Incorrect username'))
	}
	
	if (!await isCorrectPassword(password, user.password)) {
		return next(new UnauthorizedError('Incorrect password'))
	}
	
	res.json({ token: generateToken(username, user.isAdmin) })
})

router.get('/', (req, res) => {
	res.sendStatus(204)
})

router.get('/permissions', (req, res) => {
	res.json({ isAdmin: req.user.isAdmin })
})

router.get('/identity', async (req, res, next) => {
	try {
		const { username, isAdmin, locale, theme } = await users.findOne({ username: req.user.username })
		res.json({ fullName: username, isAdmin, locale, theme })
	}
	catch (err) {
		next(err)
	}
})

router.put('/identity', async (req, res, next) => {
	let { username, password, locale, theme } = req.body
	
	password = await generatePassword(password)
	const payload = removeFalsyProps({ username, password, locale, theme })
	
	if (Object.keys(payload).length) {
		await users.updateOne({ username: req.user.username }, { $set: payload })
	}
	
	res.sendStatus(200)
})

router.delete('/identity', async (req, res, next) => {
	await users.deleteOne({ username: req.user.username })
	res.sendStatus(200)
})

export default router
