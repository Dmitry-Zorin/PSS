import { NextFunction, Request, Response, Router } from 'express'
import { db } from '../db'
import { createBadRequestError, createConflictError, createNotFoundError } from '../errors'
import adminChecker from '../middleware/adminChecker'
import queryParamsParser from '../middleware/listParamsParser'
import { generatePassword } from '../utils'

const projection = {
	_id: 0,
	username: 1,
	isAdmin: 1,
	id: '$username',
}

const users = db.collection('users')
const router = Router({ mergeParams: true })

router.post('/', adminChecker, async (req: Request, res: Response, next: NextFunction) => {
	let { username, password, isAdmin } = req.body
	
	password = await generatePassword(password)
	
	if (!username || !password) {
		return next(createBadRequestError('Missing username or password'))
	}
	
	if (typeof isAdmin !== 'boolean') {
		isAdmin = false
	}
	
	try {
		await users.insertOne({ username, password, isAdmin })
	}
	catch (err) {
		if (err.name === 'MongoError' && err.code === 11000) {
			return next(createConflictError('User already exists'))
		}
		return next(err)
	}
	
	res.status(201).json({ id: username })
})

router.get('/', adminChecker, queryParamsParser, async (req: Request, res: Response, next: NextFunction) => {
	const { match, sort, skip, limit } = res.locals.searchParams
	
	const pipeline = [
		{ $match: match },
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
		next(err)
	}
})

router.get('/:id', adminChecker, async (req: Request, res: Response, next: NextFunction) => {
	const username = req.params.id
	const user = await users.findOne({ username }, { projection })
	if (!user) {
		return next(createNotFoundError('User not found'))
	}
	res.json(user)
})

router.put('/:id', adminChecker, async (req: Request, res: Response, next: NextFunction) => {
	const username = req.params.id
	const isAdmin = req.body.isAdmin
	
	if (typeof isAdmin !== 'boolean') {
		return next(createBadRequestError('Parameter isAdmin must be boolean'))
	}
	
	try {
		await users.updateOne({ username }, { $set: { isAdmin } })
		res.sendStatus(200)
	}
	catch (err) {
		next(err)
	}
})

router.delete('/:id', adminChecker, async (req: Request, res: Response, next: NextFunction) => {
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
