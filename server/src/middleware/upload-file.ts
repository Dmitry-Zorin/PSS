import Busboy from 'busboy'
import { NextFunction, Request, Response } from 'express'

const MEGABYTE = 2 ** 20
const MAX_FILE_SIZE = 10 * MEGABYTE

const limits = { files: 1, fileSize: MAX_FILE_SIZE }

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
	const { params, headers, app } = req
	const bucketName = params.resource
	
	if (!bucketName) return next()
	
	const busboy = new Busboy({ headers, limits })
		.on('file', (_, file, filename) => {
			const uploadStream = app.services.file.upload(bucketName, file, filename)
			const fileId = uploadStream.id.toString()
			
			req.body.file = {
				id: fileId,
				name: filename,
				url: `${process.env.SERVER}/files/${bucketName}/${fileId}`,
			}
		})
		.on('field', (fieldname, value) => {
			req.body[fieldname] = value
		})
		.on('finish', next)
		.on('error', () => next())
	
	req.pipe(busboy)
}
