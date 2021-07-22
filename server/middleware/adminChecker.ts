import { ForbiddenError } from '../errors'
import { NextFunction, Request, Response } from 'express'

// TODO: token information might be outdated

export default (req: Request, res: Response, next: NextFunction) => {
	// @ts-ignore
	next(!req.user?.isAdmin && new ForbiddenError(
		'You must be an admin to perform this action',
	))
}
