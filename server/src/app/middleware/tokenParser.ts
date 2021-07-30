import { NextFunction, Request, Response } from 'express'
import { TokenService } from '../../services/types'
import { createUnauthorizedError } from '../../utils/errors'

export interface User {
	username: string,
	isAdmin: boolean
}

const tokenParser = (tokenService: TokenService) => (
	(req: Request, res: Response, next: NextFunction) => {
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
)

export default tokenParser
