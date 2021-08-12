import mongo from '../../src/services/mongo'
import { DbService } from '../../src/services/types'
import { TEST_COLLECTION_NAME } from '../helpers'

const document = {
	id: '',
	name: 'mongo test name',
	desc: 'mongo test description',
	wrongProp: 'some invalid property',
	file: { id: 'file ID' },
}

export const projection = {
	name: 1,
	desc: 1,
	file: 1,
} as const

let db: DbService

const addDocument = async () => {
	const { id } = await db.addDocument(TEST_COLLECTION_NAME, document, projection)
	expect((document.id = id)).toBeString()
}

beforeAll(async () => db = await mongo())
beforeEach(addDocument)

test('Get all the collection names in the database', async () => {
	const collNames = await db.getCollectionNames()
	expect(collNames).toBeArray()
	expect(collNames.length).toBeGreaterThan(0)
	collNames.forEach(name => expect(name).toBeString())
})

test('Get the number of documents in a collection', async () => {
	const docCount = await db.getDocumentCount(TEST_COLLECTION_NAME)
	expect(docCount).toBeGreaterThan(0)
})

test('Find all the documents from a collection', async () => {
	const pipeline = [
		{ $match: { name: document.name } },
		{ $project: projection },
	]
	const docs = await db.getDocuments(TEST_COLLECTION_NAME, pipeline)
	expect(docs).toBeArray()
	expect(docs.length).toBeGreaterThan(0)
	
	docs.forEach(doc => {
		expect(doc).toContainAllKeys(['_id', 'name', 'desc', 'file'])
		expect(doc.wrongProp).toBeUndefined()
	})
})

test('Find a specific document from a collection', async () => {
	const { id: _id, name, desc } = document
	const doc1 = await db.getDocument(TEST_COLLECTION_NAME, _id, projection)
	const doc2 = await db.getDocument(TEST_COLLECTION_NAME, { _id }, projection)
	
	expect(doc1).toEqual(doc2)
	expect(doc1).toEqual(expect.objectContaining({ name, desc }))
	expect(doc1.wrongProp).toBeUndefined()
})

test('Update a document from a collection', async () => {
	const name = 'updated mongo test name'
	const desc = 'updated mongo test description'
	
	const { id, wrongProp, file } = document
	const updatedDocument = { name, desc, wrongProp }
	
	const fileId = await db.updateDocument(TEST_COLLECTION_NAME, id, updatedDocument, projection)
	expect(fileId).toBe(file.id)
	
	const doc = await db.getDocument(TEST_COLLECTION_NAME, id, projection)
	expect(doc).toEqual(expect.objectContaining({ name, desc }))
	expect(doc.wrongProp).toBeUndefined()
})

test('Delete a document from a collection', async () => {
	const { id, file } = document
	const fileId = await db.deleteDocument(TEST_COLLECTION_NAME, id)
	expect(fileId).toBe(file.id)
	
	const docPromise = db.getDocument(TEST_COLLECTION_NAME, id, projection)
	await expect(docPromise).toReject()
})
