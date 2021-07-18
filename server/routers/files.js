import { Router } from 'express'
import { fileDb, GridFSBucket, ObjectId } from '../db.js'
import { NotFoundError, WrongIdFormatError } from '../errors.js'

const router = Router()

router.get('/:resource/:fileId', async (req, res, next) => {
	let { resource, fileId } = req.params
	
	try {
		fileId = new ObjectId(fileId)
	}
	catch (err) {
		return next(new WrongIdFormatError)
	}
	
	const collection = fileDb.collection(resource)
	const projection = { filename: 1 }
	const file = collection.findOne({ _id: fileId }, { projection })
	
	if (!file) {
		return next(new NotFoundError('File'))
	}
	
	res.attachment(file.filename)
	
	new GridFSBucket(fileDb, { bucketName: resource })
		.openDownloadStream(fileId)
		.on('error', next)
		.pipe(res)
})

export default router
