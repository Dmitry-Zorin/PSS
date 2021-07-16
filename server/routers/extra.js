import { Router } from 'express'
import mongoose from 'mongoose'

const router = Router()

router.get('/resources', async (req, res, next) => {
	try {
		const collections = mongoose.connection.collections
		const collectionCount = {}
		for (const [name, collection] of Object.entries(collections)) {
			collectionCount[name] = await collection.estimatedDocumentCount()
		}
		res.json(collectionCount)
	}
	catch (err) {
		next(err)
	}
})

router.get('/form16', async (req, res, next) => {
	try {
		const groups = [
			['articles', 'monographs', 'abstracts', 'dissertations'],
			['programs', 'patents', 'reports'],
			['textbooks'],
		]
		
		const resourceData = [...Array(3).keys()].map(() => ({
			old: [],
			new: [],
		}))
		const date = new Date().getFullYear() - 3
		const collections = mongoose.connection.collections
		
		const reduce = async (collection) => {
			const collectionArray = await collection.find().toArray()
			return collectionArray.reduce((p, e) => {
				p[e._id] = e.name
				return p
			}, {})
		}
		
		const publications = await reduce(collections.publicationplaces)
		const characters = await reduce(collections.characters)
		
		for (const [i, group] of groups.entries()) {
			for (const resource of group) {
				let data = await collections[resource]
					.find({ 'authors.author': req.query.author })
					.toArray()
				
				data = data.map(e => (
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

export default router
