import bcrypt from 'bcrypt'
import { Router } from 'express'
import { BadRequestError, ConflictError } from '../errors.js'
import adminChecker from '../middleware/adminChecker.js'
import queryParamsParser from '../middleware/queryParamsParser.js'
import User from '../models/User.js'

const fieldsToSelect = {
	_id: 0,
	id: 1,
	createdAt: 1,
	login: 1,
	isAdmin: 1,
}

const selectFields = (record) => (
	Object.entries(record)
		.reduce((obj, [k, v]) => {
			if (fieldsToSelect[k]) {
				obj[k] = v
			}
			return obj
		}, {})
)

const router = Router({ mergeParams: true })

router.get('/', adminChecker, queryParamsParser, async (req, res, next) => {
	try {
		const { filter, sort, skip, limit } = req.query
		
		const [{ count: [{ total }], users }] = await User
			.aggregate()
			.match(filter)
			.sort(sort)
			.facet({
				count: [
					{ $count: 'total' },
				],
				users: [
					{ $skip: skip },
					{ $limit: limit },
					{ $project: fieldsToSelect },
				],
			})
		
		for (const user of users) {
			user.id = user.login
		}
		
		res
			.set('Content-Range', `users ${skip}-${Math.min(limit, total)}/${total}`)
			.json(users)
	}
	catch (err) {
		next(err)
	}
})

router.get('/:id', adminChecker, async (req, res, next) => {
	try {
		const user = await User
			.findOne({ login: req.params.id })
			.select(fieldsToSelect)
		res.json(user.toObject())
	}
	catch (err) {
		if (err.name === 'CastError') {
			err = new BadRequestError('Invalid user ID')
		}
		next(err)
	}
})

router.post('/', adminChecker, async (req, res, next) => {
	try {
		const user = await User.create({
			login: req.body.login,
			password: await bcrypt.hash(req.body.password, 10),
		})
		res.status(201).json(selectFields(user.toObject()))
	}
	catch (err) {
		if (err.name === 'MongoError' && err.code === 11000) {
			err = new ConflictError('User already exists')
		}
		next(err)
	}
})

router.put('/:id', adminChecker, async (req, res, next) => {
	try {
		await User.updateOne({ login: req.params.id }, selectFields(req.body))
		res.sendStatus(200)
	}
	catch (err) {
		if (err.name === 'CastError') {
			err = new BadRequestError('Invalid user ID')
		}
		next(err)
	}
})

router.delete('/:id', adminChecker, async (req, res, next) => {
	try {
		await User.deleteOne({ login: req.params.id })
		res.sendStatus(200)
	}
	catch (err) {
		if (err.name === 'CastError') {
			err = new BadRequestError('Invalid user ID')
		}
		next(err)
	}
})

export default router
