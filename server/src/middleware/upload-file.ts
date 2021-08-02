import Busboy from 'busboy'
import { NextFunction, Request, Response } from 'express'

const MEGABYTE = 2 ** 20
const MAX_FILE_SIZE = 10 * MEGABYTE

const limits = { files: 1, fileSize: MAX_FILE_SIZE }

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
	const { params, headers, app } = req
	const bucketName = params.resource
	
	if (!bucketName) return next()
	
	const uploadQueue: Promise<void>[] = []
	
	const addToUploadQueue = (_: never, file: NodeJS.ReadableStream, filename: string) => {
		const uploadPromise = app.services.file
			.upload(bucketName, file, filename)
			.then(fileInfo => {req.body.file = fileInfo})
		
		uploadQueue.push(uploadPromise)
	}
	
	const busboy = new Busboy({ headers, limits })
		.on('file', addToUploadQueue)
		.on('field', (fieldname, value) => {
			req.body[fieldname] = value
		})
		.on('finish', () => Promise.all(uploadQueue).then(() => next()))
		.on('error', () => next())
	
	req.pipe(busboy)
}
