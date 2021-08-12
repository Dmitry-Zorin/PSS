import unless from 'express-unless'
import { createUnauthorizedError } from '../helpers/errors'
import { RequestHandler } from './types'

export const tokenParser = (unlessOptions?: unless.Options) => {
	const middleware: RequestHandler = (req, res, next) => {
		const { authorization } = req.headers
		
		if (!authorization) {
			return next(createUnauthorizedError('Missing authorization token'))
		}
		
		try {
			const { jwt } = req.app.services
			const token = authorization!.split(' ')[1]
			req.user = jwt.verify(token) as any
			next()
		}
		catch {
			next(createUnauthorizedError('Authorization token expired'))
		}
	}
	
	return unlessOptions
		? unless.bind(middleware)(unlessOptions)
		: middleware
}
