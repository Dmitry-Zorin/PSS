import { NextFunction, Request, Response } from 'express'
import { createNotFoundError } from '../errors'
import { Projection } from '../projections/projection.interface'

const getProjection = (fields: Projection, method: string): Projection => ({
	...fields,
	_id: 0,
	id: '$_id',
	createdAt: { $toDate: '$_id' },
	fileId: ['GET', 'DELETE'].includes(method),
})

const resourceInfoProvider = async (req: Request, res: Response, next: NextFunction) => {
	const { resource, id } = req.params
	
	try {
		const { default: fields } = await import(`../projections/${resource}`)
		
		res.locals.resourceInfo = {
			collectionName: resource,
			projection: getProjection(fields, req.method),
			documentId: id,
		}
	}
	catch (err) {
		return next(createNotFoundError('Resource not found'))
	}
	
	next()
}

export default resourceInfoProvider
