import { Request, Response } from 'express'

export const create = async (req: Request, res: Response) => {
	const { params, body, file } = req
	const { id } = await res.app.dbService.addDocument(params.resource, body, res.locals.projection, file)
	res.status(201).json({ id })
}

export const getList = async (req: Request, res: Response) => {
	const { match = {}, sort = { _id: -1 }, skip = 0, limit = 50 } = res.locals
	const { resource } = req.params
	
	const [{ total, documents }] = await res.app.dbService.getDocuments(resource, [
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
	const { resource, id } = req.params
	const projection = { ...res.locals.projection, file: 1 }
	res.json(await res.app.dbService.getDocument(resource, id, projection))
}

export const update = async (req: Request, res: Response) => {
	const { params: { resource, id }, body, file } = req
	await res.app.dbService.updateDocument(resource, id, body, res.locals.projection, file)
	res.json({ id })
}

export const remove = async (req: Request, res: Response) => {
	const { resource, id } = req.params
	await res.app.dbService.deleteDocument(resource, id)
	res.sendStatus(200)
}
