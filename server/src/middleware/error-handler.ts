import { NextFunction, Request, Response } from 'express'
import {
	BadRequestError,
	HttpError,
	internalServerError,
	UnauthorizedError,
} from '../helpers/errors'

interface UncaughtError extends Error {
	type?: string,
	body?: string
}

export const errorHandler = () => (
	(err: HttpError | UncaughtError, req: Request, res: Response, _: NextFunction) => {
		const sendError = ({ status, ...error }: HttpError) => {
			res.status(status).json({ error })
		}
		
		if (!(err instanceof Error)) {
			return sendError(err)
		}
		
		// express.json
		if (err?.type === 'entity.parse.failed') {
			return sendError(BadRequestError(
				`Invalid Content-Type request header or body (${err?.body})`),
			)
		}
		
		// express-jwt
		if (err.name === 'UnauthorizedError') {
			return sendError(UnauthorizedError('Invalid token'))
		}
		
		console.error(err)
		sendError(internalServerError)
	}
)
