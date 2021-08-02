import { Router } from 'express'
import { createSafeHandler } from '../middleware/create-safe-handler'
import { createNotFoundError } from '../utils/errors'

const fileRouter = Router()

fileRouter.get('/:resource/:fileId', createSafeHandler(async (req, res) => {
	const { db, file: fileService } = res.app.services
	const { resource, fileId } = req.params
	const projection = { file: { name: 1 } } as const
	
	const { file } = await db.getDocument(resource, fileId, projection)
	
	if (!file) {
		throw createNotFoundError('File not found')
	}
	
	res.attachment(file.name)
	fileService.download(resource, fileId).pipe(res)
}))

export default fileRouter
