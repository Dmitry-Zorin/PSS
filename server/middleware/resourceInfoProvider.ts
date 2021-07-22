import { NextFunction, Request, Response } from 'express'
import { BadRequestError, NotFoundError } from '../errors'

export default async (req: Request, res: Response, next: NextFunction) => {
	const { resource, id } = req.params
	
	if (!resource) {
		return next(new BadRequestError('Missing resource parameter'))
	}
	
	try {
		res.locals.resourceInfo = {
			collectionName: resource,
			projection: await import(`../projections/${resource}`).then(e => e.default),
			documentId: id
		}
	}
	catch (err) {
		return next(new NotFoundError('Resource not found'))
	}
	
	next()
}
