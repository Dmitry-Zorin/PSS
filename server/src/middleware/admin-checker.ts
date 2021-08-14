import { ForbiddenError } from '../helpers/errors'
import { RequestHandler } from './types'

export const adminChecker = (): RequestHandler => (
	(req, res, next) => {
		next(!req.user.isAdmin && ForbiddenError(
			'You must be an admin to perform this action',
		))
	}
)
