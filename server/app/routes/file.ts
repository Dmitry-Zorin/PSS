import { Router } from 'express'
import { createNotFoundError } from '../../errors'

const fileRouter = Router()
	.get('/:resource/:fileId', async (req, res) => {
		let { resource, fileId } = req.params
		
		const file = await res.app.dbService.getDocument(resource, fileId, { filename: 1 })
		
		if (!file) {
			throw createNotFoundError('File not found')
		}
		
		res.attachment(file.filename)
		
		res.app.fileService.getFile(resource, fileId)
			.on('error', (err) => {throw err})
			.pipe(res)
	})

export default fileRouter
