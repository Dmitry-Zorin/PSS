import { Router } from 'express'
import { createSafeHandler } from '../middleware'

const fileRouter = Router()

fileRouter.get('/:resource/:fileId', createSafeHandler(async (req, res) => {
	const { resource, fileId } = req.params
	const fileService = res.app.services.file
	
	const projection = { filename: 1 } as const
	const { filename } = await fileService.getFileInfo(resource, fileId, projection)
	res.attachment(filename)
	
	fileService.download(resource, fileId).pipe(res)
}))

export default fileRouter
