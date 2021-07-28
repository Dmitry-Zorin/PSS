import { NextFunction, Request, Response } from 'express'
import { createForbiddenError } from '../../errors'

// TODO: token information might be outdated

const adminChecker = (req: Request, res: Response, next: NextFunction) => {
	next(!res.locals.user?.isAdmin && createForbiddenError(
		'You must be an admin to perform this action',
	))
}

export default adminChecker
