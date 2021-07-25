import { createInternalServerError, createUnauthorizedError, HttpError } from '../errors'
import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
	const sendError = ({ status, ...error }: HttpError) => {
		res.status(status).json(error)
	}
	
	if (!(err instanceof Error)) {
		return sendError(err)
	}
	
	// express-jwt
	if (err.name === 'UnauthorizedError') {
		return sendError(createUnauthorizedError('Invalid token'))
	}
	
	console.error(err)
	
	sendError(createInternalServerError(
		'Oops, something went wrong while processing the request',
	))
}

export default errorHandler
