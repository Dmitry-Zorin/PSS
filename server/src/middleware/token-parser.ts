import { NextFunction, Request, Response } from 'express'
import unless from 'express-unless'
import { TokenService } from '../services/types'
import { User } from '../types'
import { createUnauthorizedError } from '../utils/errors'

export const tokenParser = (tokenService: TokenService, unlessOptions?: unless.Options) => {
	const middleware = (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers
		
		if (!authorization) {
			return next(createUnauthorizedError('Missing authorization token'))
		}
		
		try {
			const token = authorization!.split(' ')[1]
			req.user = tokenService.verify(token) as unknown as User
		}
		catch {
			return next(createUnauthorizedError('Authorization token expired'))
		}
		
		next()
	}
	return unlessOptions
		? unless.bind(middleware)(unlessOptions)
		: middleware
}
