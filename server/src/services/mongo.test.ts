import mongo from './mongo'
import { disconnect } from './mongo-client'
import { DbService, Projection } from './types'

const collection = 'tests'

const document = {
	id: '',
	name: 'test name',
	desc: 'test description',
	wrongProp: 'some invalid property',
	file: { id: 'file ID' },
}

export const projection: Projection = {
	name: 1,
	desc: 1,
	file: 1,
}

let db: DbService

const addDocument = async () => {
	const { id } = await db.addDocument(collection, document, projection)
	expect((document.id = id)).toBeString()
}

beforeAll(async () => db = await mongo())
beforeEach(addDocument)
afterAll(disconnect)

test('Get all the collection names in the database', async () => {
	const collNames = await db.getCollectionNames()
	expect(collNames).toBeArray()
	expect(collNames.length).toBeGreaterThan(0)
	collNames.forEach(name => expect(name).toBeString())
})

test('Get the number of documents in a collection', async () => {
	const docCount = await db.getDocumentCount(collection)
	expect(docCount).toBeGreaterThan(0)
})

test('Find all the documents from a collection', async () => {
	const pipeline = [{ $project: projection }]
	const docs = await db.getDocuments(collection, pipeline)
	expect(docs).toBeArray()
	expect(docs.length).toBeGreaterThan(0)
	
	docs.forEach(doc => {
		expect(doc).toContainAllKeys(['_id', 'name', 'desc', 'file'])
		expect(doc.wrongProp).toBeUndefined()
	})
})

test('Find a specific document from a collection', async () => {
	const { id: _id, name, desc } = document
	const doc1 = await db.getDocument(collection, _id, projection)
	const doc2 = await db.getDocument(collection, { _id }, projection)
	
	expect(doc1).toEqual(doc2)
	expect(doc1).toEqual(expect.objectContaining({ name, desc }))
	expect(doc1.wrongProp).toBeUndefined()
}, 60000)

test('Update a document from a collection', async () => {
	const name = 'updated test name'
	const desc = 'updated test description'
	
	const { id, wrongProp, file } = document
	const updatedDocument = { name, desc, wrongProp }
	
	const fileId = await db.updateDocument(collection, id, updatedDocument, projection)
	expect(fileId).toBe(file.id)
	
	const doc = await db.getDocument(collection, id, projection)
	expect(doc).toEqual(expect.objectContaining({ name, desc }))
	expect(doc.wrongProp).toBeUndefined()
})

test('Delete a document from a collection', async () => {
	const { id, file } = document
	const fileId = await db.deleteDocument(collection, id)
	expect(fileId).toBe(file.id)
	
	const docPromise = db.getDocument(collection, id, projection)
	await expect(docPromise).toReject()
})
