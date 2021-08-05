import { NextFunction, Request, Response } from 'express'
import unless from 'express-unless'
import { createUnauthorizedError } from '../helpers/errors'
import { User } from '../types'

export const tokenParser = (unlessOptions?: unless.Options) => {
	const middleware = (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers
		
		if (!authorization) {
			return next(createUnauthorizedError('Missing authorization token'))
		}
		
		try {
			const token = authorization!.split(' ')[1]
			req.user = req.app.services.token.verify(token) as unknown as User
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
