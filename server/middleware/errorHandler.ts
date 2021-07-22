import { InternalServerError } from '../errors'
import { NextFunction, Request, Response } from 'express'

interface CustomError extends Error {
	status: number
}

export default (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	if (!err.status || !err.message) {
		console.error(err)
		err = new InternalServerError(
			'Oops, something went wrong while processing the request',
		)
	}
	res.type('application/json').status(err.status).json({
		error: {
			name: err.name,
			message: err.message,
		},
	})
}
