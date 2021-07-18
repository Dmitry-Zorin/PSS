import { Router } from 'express'
import { db } from '../db.js'
import { BadRequestError, ConflictError, NotFoundError } from '../errors.js'
import adminChecker from '../middleware/adminChecker.js'
import queryParamsParser from '../middleware/queryParamsParser.js'
import { generatePassword } from '../utils.js'

const projection = {
	_id: 0,
	username: 1,
	isAdmin: 1,
	id: '$username',
}

const users = db.collection('users')
const router = Router({ mergeParams: true })

router.post('/', adminChecker, async (req, res, next) => {
	let { username, password, isAdmin } = req.body
	
	password = await generatePassword(password)
	
	if (!username || !password) {
		return next(new BadRequestError('Missing username or password'))
	}
	
	if (typeof isAdmin !== 'boolean') {
		isAdmin = false
	}
	
	try {
		await users.insertOne({ username, password, isAdmin })
	}
	catch (err) {
		if (err.name === 'MongoError' && err.code === 11000) {
			err = new ConflictError('User already exists')
		}
		return next(err)
	}
	
	res.status(201).json({ id: username })
})

router.get('/', adminChecker, queryParamsParser, async (req, res, next) => {
	const { filter, sort, skip, limit } = req.query
	
	const pipeline = [
		{ $match: filter },
		{ $sort: sort },
		{
			$facet: {
				count: [
					{ $count: 'total' },
				],
				docs: [
					{ $skip: skip },
					{ $limit: limit },
					{ $project: projection },
				],
			},
		},
		{
			$project: {
				total: { $arrayElemAt: ['$count.total', 0] },
				docs: 1,
			},
		},
	]
	
	try {
		const [{ total, docs }] = await users.aggregate(pipeline).toArray()
		res.set('Content-Range', `users ${skip}-${Math.min(limit, total)}/${total}`)
		res.json(docs)
	}
	catch (err) {
		if (err.name === 'MongoError') {
			let param
			
			switch (err.code) {
				case 15959:
					param = 'filter'
					break
				
				case 15972:
					param = 'range'
					break
				
				case 15973:
				case 15974:
					param = 'sort'
					break
				
				default:
					param = 'query'
			}
			err = new BadRequestError(`Invalid ${param} parameter`)
		}
		next(err)
	}
})

router.get('/:id', adminChecker, async (req, res, next) => {
	const username = req.params.id
	const user = await users.findOne({ username }, { projection })
	if (!user) {
		return next(new NotFoundError('User'))
	}
	res.json(user)
})

router.put('/:id', adminChecker, async (req, res, next) => {
	const username = req.params.id
	const isAdmin = req.body.isAdmin
	
	if (typeof isAdmin !== 'boolean') {
		return next(new BadRequestError)
	}
	
	try {
		await users.updateOne({ username }, { $set: { isAdmin } })
		res.sendStatus(200)
	}
	catch (err) {
		next(err)
	}
})

router.delete('/:id', adminChecker, async (req, res, next) => {
	try {
		const username = req.params.id
		await users.deleteOne({ username })
		res.sendStatus(200)
	}
	catch (err) {
		next(err)
	}
})

export default router
