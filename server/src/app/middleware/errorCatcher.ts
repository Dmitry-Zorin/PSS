import { NextFunction, Request, Response } from 'express'

const errorCatcher = (handler: (req: Request, res: Response, next: NextFunction) => any) => (
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await handler(req, res, next)
		}
		catch (err) {
			next(err)
		}
	}
)

export default errorCatcher
