import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import { createBadRequestError } from '../../utils/errors'

const fileParser = (req: Request, res: Response, next: NextFunction) => {
	multer().single('file')(req, res, (err: unknown) => {
		next(err && createBadRequestError(
			'Error while processing the file',
		))
	})
}

export default fileParser
