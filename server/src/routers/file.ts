import { Router } from 'express'
import { UnauthorizedError } from '../helpers/errors'
import { safeHandler } from '../middleware'

const fileRouter = Router()

fileRouter.get('/:resource/:fileId', safeHandler(async (req, res) => {
	const { resource, fileId } = req.params
	const { fs, crypt } = res.app.services
	const { filekey } = req.query
	
	if (!await crypt.compare(fileId, filekey as string)) {
		throw UnauthorizedError('Invalid file filekey')
	}
	
	const { file, stream } = await fs.download(resource, fileId)
	stream.pipe(res.attachment(file.filename))
}))

export default fileRouter
