import { NextFunction, Request, Response } from 'express'
import { Projection } from '../../../../db/db.types'
import { createNotFoundError } from '../../../../utils/errors'

export type Projections = Record<string, Projection>

export const setProjection = (projections: Projections) => (
	(req: Request, res: Response, next: NextFunction, resource: string) => {
		const projection = projections[resource]
		
		if (!projection) {
			return next(createNotFoundError('Resource not found'))
		}
		
		res.locals.projection = {
			...projection,
			_id: 0,
			id: '$_id',
			createdAt: { $toDate: '$_id' },
		}
		next()
	}
)

export const create = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { projection } = res.locals
	const { params: { resource }, body, file } = req
	const { id } = await db.addDocument(resource, body, projection, file)
	res.status(201).json({ id })
}

export const getList = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { resource } = req.params
	const { match = {}, sort = { _id: -1 }, skip = 0, limit = 50 } = res.locals
	
	const [{ total, documents }] = await db.getDocuments(resource, [
		{ $match: match },
		{ $sort: sort },
		{
			$facet: {
				count: [
					{ $count: 'total' },
				],
				documents: [
					{ $skip: skip },
					{ $limit: Math.min(limit, 50) },
					{ $project: res.locals.projection },
				],
			},
		},
		{
			$project: {
				total: { $ifNull: [{ $arrayElemAt: ['$count.total', 0] }, 0] },
				documents: 1,
			},
		},
	])
	
	const range = `${resource} ${skip}-${Math.min(limit, total)}/${total}`
	res.set('content-range', range).json(documents)
}

export const getOne = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { resource, id } = req.params
	const projection = { ...res.locals.projection, file: 1 }
	res.json(await db.getDocument(resource, id, projection))
}

export const update = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { projection } = res.locals
	const { params: { resource, id }, body, file } = req
	await db.updateDocument(resource, id, body, projection, file)
	res.json({ id })
}

export const remove = async (req: Request, res: Response) => {
	const { db } = res.app.services
	const { resource, id } = req.params
	await db.deleteDocument(resource, id)
	res.sendStatus(200)
}
