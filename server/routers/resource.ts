import { NextFunction, Request, Response, Router } from 'express'
import { addDocument, deleteDocument, getDocument, getDocuments, updateDocument } from '../db'
import adminChecker from '../middleware/adminChecker'
import fileParser from '../middleware/fileParser'
import listParamsParser from '../middleware/listParamsParser'
import resourceInfoProvider from '../middleware/resourceInfoProvider'

const router = Router({ mergeParams: true })

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { collectionName, projection } = res.locals.resourceInfo
	const { error, doc } = await addDocument(collectionName, req.body, projection, req.file)
	
	if (error) {
		return next(error)
	}
	
	if (!doc?.id) {
		return res.sendStatus(204)
	}
	
	res.status(201).json({ id: doc.id })
}

router.post('/:resource', adminChecker, fileParser, resourceInfoProvider, create)

router.get(
	'/:resource',
	adminChecker,
	listParamsParser,
	resourceInfoProvider,
	async (req: Request, res: Response, next: NextFunction) => {
		const { match = {}, sort = {}, skip = 0, limit = 50 } = req.query
		const { collectionName, projection } = res.locals.resourceInfo
		
		const { error, docs } = await getDocuments(collectionName, [
			{ $match: match },
			{ $sort: sort },
			{
				$facet: {
					count: [
						{ $count: 'total' },
					],
					documents: [
						{ $skip: skip },
						{ $limit: Math.min(+limit, 50) },
						{ $project: projection },
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
		
		if (error) {
			return next(error)
		}
		
		const [{ total, documents }] = docs || [{}]
		const range = `${collectionName} ${skip}-${Math.min(+limit, total)}/${total}`
		res.set('content-range', range).json(documents)
	},
)

router.get(
	'/:resource/:id',
	adminChecker,
	resourceInfoProvider,
	async (req: Request, res: Response, next: NextFunction) => {
		const { collectionName, projection, documentId } = res.locals.resourceInfo
		const { error, doc } = await getDocument(collectionName, documentId, projection)
		
		if (error) {
			return next(error)
		}
		
		res.json(doc)
	},
)

router.put(
	'/:resource/:id',
	adminChecker,
	fileParser,
	resourceInfoProvider,
	async (req: Request, res: Response, next: NextFunction) => {
		const { files, body }: any = req
		const { collectionName, projection, documentId } = res.locals.resourceInfo
		const file = files?.file?.[0]
		const { error } = await updateDocument(collectionName, documentId, body, projection, file)
		
		if (error) {
			return next(error)
		}
		
		res.sendStatus(204)
	},
)

router.delete(
	'/:resource/:id',
	adminChecker,
	resourceInfoProvider,
	async (req: Request, res: Response, next: NextFunction) => {
		const { collectionName, documentId } = res.locals.resourceInfo
		const { error } = await deleteDocument(collectionName, documentId)
		
		if (error) {
			return next(error)
		}
		
		res.sendStatus(204)
	},
)

export default router
