import Busboy from 'busboy'
import { finished } from 'stream/promises'
import { createBadRequestError } from '../helpers/errors'
import { RequestHandler } from './types'

const MEGABYTE = 2 ** 20
const MAX_FILE_SIZE = 10 * MEGABYTE

const limits = {
	files: 1,
	fileSize: MAX_FILE_SIZE,
}

const parseField = (value: string) => {
	try {
		return JSON.parse(value)
	}
	catch {
		return value
	}
}

export const fileUploader = (): RequestHandler => (
	(req, res, next) => {
		const bucketName = req.params.resource
		const { fs } = req.app.services
		
		let uploadPromise = Promise.resolve()
		
		try {
			const busboy = new Busboy({ headers: req.headers, limits })
				.on('finish', () => uploadPromise.then(next))
				.on('limit', () => next(createBadRequestError('File too large')))
				.on('error', () => next(createBadRequestError('Cannot upload file')))
			
			busboy.on('field', (fieldname, value) => {
				req.body[fieldname] = parseField(value)
			})
			
			busboy.on('file', (_, file, filename) => {
				const { id, stream } = fs.upload(bucketName, file, filename)
				req.body.file = { id, name: filename }
				uploadPromise = finished(stream)
			})
			
			req.pipe(busboy)
		}
		catch {
			next()
		}
	}
)
