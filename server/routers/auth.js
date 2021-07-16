import bcrypt from 'bcrypt'
import { Router } from 'express'
import jsonWebToken from 'jsonwebtoken'
import { ConflictError, UnauthorizedError } from '../errors.js'
import User from '../models/User.js'

const generateToken = (login, isAdmin) => (
	jsonWebToken.sign(
		{ login, isAdmin },
		process.env.SECRET_KEY,
		{ expiresIn: 31536000 },
	)
)

const router = Router({ mergeParams: true })

router.get('/', (req, res) => {
	res.sendStatus(204)
})

router.get('/permissions', (req, res) => {
	res.json({ isAdmin: req.user.isAdmin })
})

router.get('/identity', async (req, res, next) => {
	try {
		const user = await User.findOne({ login: req.user.login })
		res.json({
			id: user._id,
			fullName: user.login,
			isAdmin: user.isAdmin,
			locale: user.locale,
			theme: user.theme,
		})
	}
	catch (err) {
		next(err)
	}
})

router.post('/register', async (req, res, next) => {
	try {
		const { login, password } = req.body
		
		await User.create({
			login,
			password: await bcrypt.hash(password, 10),
			isAdmin: false,
		})
		
		res.status(201).json({
			token: generateToken(login, false),
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
	try {
		const { login, password } = req.body
		const user = await User.findOne({ login })
		
		if (user && await bcrypt.compare(password, user.password)) {
			return res.json({
				token: generateToken(login, user.isAdmin),
			})
		}
		
		next(new UnauthorizedError('Incorrect login or password'))
	}
	catch (err) {
		next(err)
	}
})

export default router
