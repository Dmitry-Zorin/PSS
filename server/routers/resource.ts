import { NextFunction, Request, Response, Router } from 'express'
import { addDocument, deleteDocument, getDocument, getDocuments, updateDocument } from '../db'
import adminChecker from '../middleware/adminChecker'
import fileParser from '../middleware/fileParser'
import listParamsParser from '../middleware/listParamsParser'
import resourceInfoProvider from '../middleware/resourceInfoProvider'

const router = Router({ mergeParams: true })

router.post(
	'/:resource',
	adminChecker,
	fileParser,
	resourceInfoProvider,
	async (req: Request, res: Response, next: NextFunction) => {
		const { collectionName, projection } = res.locals.resourceInfo
		const { files, body }: any = req
		const file = files?.file?.[0]
		const { error, doc: { id } } = await addDocument(collectionName, body, projection, file)
		
		if (error) {
			return next(error)
		}
		
		if (!id) {
			return res.sendStatus(204)
		}
		
		res.status(201).json({ id })
	},
)

router.get(
	'/:resource',
	adminChecker,
	listParamsParser,
	resourceInfoProvider,
	async (req: Request, res: Response, next: NextFunction) => {
		const { match, sort, skip, limit } = res.locals.searchParams
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
						{ $limit: limit },
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
		
		const [{ total, documents }] = docs as any[]
		res.set('Content-Range', `${collectionName} ${skip}-${Math.min(limit, total)}/${total}`)
		res.json(documents)
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
