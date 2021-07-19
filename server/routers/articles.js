import { Router } from 'express'
import { Readable } from 'stream'
import { db, fileDb, GridFSBucket, ObjectId } from '../db.js'
import { BadRequestError, WrongIdFormatError } from '../errors.js'
import adminChecker from '../middleware/adminChecker.js'
import fileUploader from '../middleware/fileUploader.js'
import queryParamsParser from '../middleware/queryParamsParser.js'
import { projectTruthyProps, removeFalsyProps } from '../utils.js'

const resource = 'articles'
const resourceItem = resource.replace(/s$/, '')
const collection = db.collection(resource)

const projection = {
	_id: 0,
	id: '$_id',
	headline: 1,
	abstract: 1,
	type: 1,
	year: 1,
	volume: 1,
	authors: 1,
	publicationPlace: 1,
	character: 1,
	exitDate: 1,
	file: 1,
	createdAt: { $toDate: '$_id' },
}

const router = Router({ mergeParams: true })

router.post('/', adminChecker, fileUploader, async (req, res, next) => {
	const { files, body } = req
	const { buffer, originalname } = files?.file?.[0]
	
	const createResource = async (file) => {
		body.fileId = file._id
		const { insertedId } = await collection.insertOne(removeFalsyProps(body))
		res.status(201).json({ id: insertedId })
	}
	
	try {
		const bucket = new GridFSBucket(fileDb, { bucketName: resource })
		Readable.from(buffer)
			.pipe(bucket.openUploadStream(originalname))
			.on('error', next)
			.on('finish', createResource)
	}
	catch (err) {
		next(err)
	}
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
		const [{ total = 0, docs }] = await collection.aggregate(pipeline).toArray()
		res.set('Content-Range', `${resource} ${skip}-${Math.min(limit, total)}/${total}`)
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
	let resourceId
	try {
		resourceId = new ObjectId(req.params.id)
	}
	catch (err) {
		return next(new WrongIdFormatError)
	}
	
	try {
		const doc = await collection.findOne({ _id: resourceId }, { projection })
		if (!doc) {
			return next(new BadRequestError(`${resourceItem} not found`))
		}
		res.json(doc)
	}
	catch (err) {
		next(err)
	}
})

router.put('/:id', adminChecker, fileUploader, async (req, res, next) => {
	const { files, body, params } = req
	body.file = files?.file?.[0]
	const payload = projectTruthyProps(body, projection)
	
	if (Object.keys(payload).length) {
		try {
			const resourceId = new ObjectId(params.id)
			await collection.updateOne({ _id: resourceId }, { $set: payload })
		}
		catch (err) {
			return next(new WrongIdFormatError)
		}
	}
	
	res.sendStatus(204)
})

router.delete('/:id', adminChecker, async (req, res, next) => {
	try {
		const resourceId = new ObjectId(req.params.id)
		await collection.deleteOne({ _id: resourceId })
		res.sendStatus(204)
	}
	catch (err) {
		next(new WrongIdFormatError)
	}
})

export default router
