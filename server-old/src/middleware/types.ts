import { NextFunction, Request, Response } from 'express'

export interface RequestHandler {
	(req: Request, res: Response, next: NextFunction): void
}
