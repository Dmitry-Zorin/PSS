import { Router } from 'express'
import { createNotFoundError } from '../../utils/errors'
import errorCatcher from '../middleware/errorCatcher'

const fileRouter = Router()
	.get('/:resource/:fileId', errorCatcher(async (req, res) => {
		const { db, file: fileService } = res.app.services
		const { resource, fileId } = req.params
		
		const file = await db.getDocument(resource, fileId, { filename: 1 })
		
		if (!file) {
			throw createNotFoundError('File not found')
		}
		
		res.attachment(file.filename)
		
		fileService.download(resource, fileId)
			.on('error', (err: any) => { throw err })
			.pipe(res)
	}))

export default fileRouter
