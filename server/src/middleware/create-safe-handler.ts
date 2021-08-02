import { NextFunction, Request, Response } from 'express'

export const createSafeHandler = (handler: (
	req: Request,
	res: Response,
	next: NextFunction,
) => any) => (
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await handler(req, res, next)
		}
		catch (err) {
			next(err)
		}
	}
)
