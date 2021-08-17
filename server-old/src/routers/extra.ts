import { Router } from 'express'
import { zipObject } from 'lodash'
import { safeHandler } from '../middleware'

const extraRouter = Router()

extraRouter.get('/resources', safeHandler(async (req, res) => {
	const { db } = res.app.services
	const collNames = await db.getCollectionNames()
	const countPromises = collNames.map(db.getDocumentCount)
	const docCounts = await Promise.all(countPromises)
	res.json(zipObject(collNames, docCounts))
}))

/*
const groups = [
	['articles', 'monographs', 'abstracts', 'dissertations'],
	['programs', 'patents', 'reports'],
	['textbooks'],
]

extraRouter.get('/form16/:author', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const resourceData = groups.map(() => ({ old: [], new: [] }))
		const date = new Date().getFullYear() - 3
		const collections = await db.collections()
		
		const getCollObj = (collection: Cursor) => {
			const collObj: { [key: string]: string } = {}
			for (const doc of collection) {
				collObj[doc._id] = doc.name
			}
			return collObj
		}
		
		const publications = getCollObj(await collections.publicationplaces.find())
		const characters = getCollObj(await collections.characters.find())
		
		for (const [i, group] of groups.entries()) {
			for (const resource of group) {
				const collection = await collections[resource]
					.find({ 'authors.author': req.params.author })
				
				const data = collection.map((e: object) => (
					Object.assign(e, {
						publicationPlace: publications[e.publicationPlace] || '',
						character: characters[e.character] || '-----',
					})
				))
				
				resourceData[i].old = [
					...resourceData[i].old,
					...data.filter(e => e.creationDate < date),
				]
				
				resourceData[i].new = [
					...resourceData[i].new,
					...data.filter(e => e.creationDate >= date),
				]
				
				if (!resourceData[i].old.length) {
					resourceData[i].old = resourceData[i].new
					resourceData[i].new = []
				}
			}
		}
		
		res.json(resourceData)
	}
	catch (err) {
		next(err)
	}
})
*/

export default extraRouter
