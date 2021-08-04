import { NextFunction, Request, Response } from 'express'

export const removeFile = async (req: Request, res: Response, next: NextFunction) => {
	const { file } = req.app.services
	const bucketName = req.params.resource
	const fileId = res.locals.fileToRemove
	
	try {
		await file.remove(bucketName, fileId)
		next()
	}
	catch (err) {
		console.error(err)
		next(err)
	}
}
