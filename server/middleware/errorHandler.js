import { InternalServerError } from '../errors.js'

export default (err, req, res, next) => {
	if (!err.status || !err.message) {
		console.error(err)
		err = new InternalServerError(
			'Oops, something went wrong while processing the request',
		)
	}
	res.type('application/json').status(err.status).json({
		error: {
			name: err.name,
			message: err.message,
		},
	})
}
