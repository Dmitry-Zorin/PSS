import { NextFunction, Request, Response } from 'express'
import { createForbiddenError } from '../utils/errors'

export const checkIfAdmin = (req: Request, res: Response, next: NextFunction) => {
	next(!req.user.isAdmin && createForbiddenError(
		'You must be an admin to perform this action',
	))
}
