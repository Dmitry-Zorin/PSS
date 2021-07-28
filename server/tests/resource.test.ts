import dotenv from 'dotenv'
import { fetchApi, stringifyValues } from '../utils'
import 'jest-extended'
import connectToDb from '../db/mongo'
import { MongoClient } from 'mongodb'
import { join } from 'path'
import { createReadStream } from 'fs'
import FormData from 'form-data'

dotenv.config()

const testCollectionName = 'tests'

const testDocument = {
	id: '',
	name: 'test document',
	desc: 'test document description',
	wrongProp: 'some unknown property',
}

const createFileStream = () => (
	createReadStream(join(__dirname, 'test.pdf'))
)

let dbClient: MongoClient

let fetchTestApi: typeof fetchApi

const createFetchFunction = (token: string) => {
	fetchTestApi = (path = '', options) => (
		fetchApi(`tests/${path}`, options, token)
	)
}

const login = async () => {
	const { json } = await fetchApi('auth/login', {
		method: 'post',
		body: new URLSearchParams({
			username: 'dima',
			password: 'zorin',
		}),
	})
	expect(json?.token).toBeString()
	createFetchFunction(json.token)
}

const createDocument = async () => {
	const entries = Object.entries({
		...testDocument,
		file: createFileStream(),
	})
	const body = entries.reduce((result, entry) => {
		result.append(...entry)
		return result
	}, new FormData())
	
	const { json } = await fetchTestApi('', { method: 'post', body })
	expect((testDocument.id = json?.id)).toBeString()
}

const cleanUpDb = async () => {
	if (!dbClient) {
		dbClient = await connectToDb()
	}
	await Promise.all([
		db.collection(testCollectionName).drop(),
		fileDb.collection(`${testCollectionName}.files`).drop(),
		fileDb.collection(`${testCollectionName}.chunks`).drop(),
	])
	await dbClient.close()
}

beforeAll(login)
beforeEach(createDocument)
afterAll(cleanUpDb)

test('Find a document', async () => {
	const { id, name, desc } = testDocument
	const fileId = expect.any(String)
	const { json } = await fetchTestApi(id)
	expect(json).toEqual(expect.objectContaining({ id, name, desc, fileId }))
	expect(json.wrongProp).toBeUndefined()
})

test('Find a list of documents', async () => {
	const query = new URLSearchParams(stringifyValues({
		filter: { name: testDocument.name },
		sort: { name: 1 },
		skip: 0,
		limit: 25,
	}))
	
	const { json } = await fetchTestApi(`?${query}`)
	expect(json).toBeArray()
	expect(json.length).toBeGreaterThan(0)
	
	const fields = ['id', 'name', 'desc', 'createdAt', 'fileId']
	expect(json).toEqual(json.map(() => expect.toContainKeys(fields)))
})

test('Update a document', async () => {
	const { id, wrongProp } = testDocument
	const updatedTestDocument = {
		id,
		name: 'updated test resource',
		desc: 'updated test resource description',
		file: createFileStream(),
		wrongProp,
	}
	
	const resp = await fetchTestApi(id)
	const fileId = resp.json.fileId
	expect(fileId).toBeString()
	
	const entries = Object.entries(updatedTestDocument)
	const body = entries.reduce((result, entry) => {
		result.append(...entry)
		return result
	}, new FormData())
	await fetchTestApi(id, { method: 'put', body })
	
	const { json } = await fetchTestApi(id)
	const { wrongProp: _, file, ...expectedProps } = updatedTestDocument
	expect(json).toEqual(expect.objectContaining(expectedProps))
	expect(json.fileId).not.toBe(fileId)
	expect(json.wrongProp).toBeUndefined()
})

test('Delete a document', async () => {
	const { id } = testDocument
	
	const resp = await fetchTestApi(id)
	expect(resp.json?.error).toBeUndefined()
	const fileId = resp.json?.fileId
	
	await fetchTestApi(id, { method: 'delete' })
	
	const { status, json } = await fetchTestApi(id)
	expect(status).toBe(404)
	expect(json?.error?.name).toBe('NotFoundError')
	
	if (!dbClient) {
		dbClient = await connectToDb()
	}
	const coll = fileDb.collection(`${testCollectionName}.files`)
	const file = await coll.findOne({ _id: fileId })
	expect(file).toBeFalsy()
})
