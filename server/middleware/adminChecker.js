import { ForbiddenError } from '../errors.js'

export default (req, res, next) => {
	next(!req.user.isAdmin && new ForbiddenError(
		'You must be an admin to perform this action',
	))
}
