import { NextFunction, Request, Response, Router } from 'express'
import { fileDb } from '../db'
import { GridFSBucket, ObjectId } from 'mongodb'
import { createNotFoundError, wrongIdFormatError } from '../errors'

const router = Router()

router.get('/:resource/:fileId', async (req: Request, res: Response, next: NextFunction) => {
	let { resource, fileId } = req.params
	
	if (!ObjectId.isValid(fileId)) {
		return next(wrongIdFormatError)
	}
	
	const collection = fileDb.collection(resource)
	const _id = new ObjectId(fileId)
	const projection = { filename: 1 }
	const file = await collection.findOne({ _id }, { projection })
	
	if (!file) {
		return next(createNotFoundError('File not found'))
	}
	
	res.attachment(file.filename)
	
	const bucket = new GridFSBucket(fileDb, { bucketName: resource })
	bucket.openDownloadStream(_id)
		.on('error', next)
		.pipe(res)
})

export default router
