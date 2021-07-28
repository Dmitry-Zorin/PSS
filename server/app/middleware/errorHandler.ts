import { NextFunction, Request, Response } from 'express'
import {
	createBadRequestError,
	createInternalServerError,
	createUnauthorizedError,
	HttpError,
} from '../../errors'

interface UncaughtError extends Error {
	type?: string,
	body?: string
}

const errorHandler = (
	err: HttpError | UncaughtError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const sendError = ({ status, ...error }: HttpError) => {
		res.status(status).json({ error })
	}
	
	if (!(err instanceof Error)) {
		return sendError(err)
	}
	
	// express.json
	if (err?.type === 'entity.parse.failed') {
		return sendError(createBadRequestError(`Invalid request body: ${err?.body}`))
	}
	
	// express-jwt
	if (err.name === 'UnauthorizedError') {
		return sendError(createUnauthorizedError('Invalid token'))
	}
	
	console.error(err)
	// TODO: Keep error logs somewhere
	
	sendError(createInternalServerError())
}

export default errorHandler
