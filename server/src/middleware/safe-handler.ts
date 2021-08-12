import { RequestHandler } from './types'

export const safeHandler = (handler: RequestHandler): RequestHandler => (
	async (req, res, next) => {
		try {
			await handler(req, res, next)
		}
		catch (err) {
			next(err)
		}
	}
)
