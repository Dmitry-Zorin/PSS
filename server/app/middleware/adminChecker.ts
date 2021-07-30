import { NextFunction, Request, Response } from 'express'
import { createForbiddenError } from '../../utils/errors'

// TODO: token information might be outdated

const adminChecker = (req: Request, res: Response, next: NextFunction) => {
	next(!req.user.isAdmin && createForbiddenError(
		'You must be an admin to perform this action',
	))
}

export default adminChecker
