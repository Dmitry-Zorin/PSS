import FormData from 'form-data'
import dotenv from 'dotenv'
import { fetchApi } from '../utils'
import 'jest-extended'
import connectToDb, { db, fileDb } from '../db'
import { RequestInit } from 'node-fetch'
import { forIn } from 'lodash'

dotenv.config()

const testDocument = {
	id: '',
	name: 'test document',
	desc: 'test document description',
	wrongProp: 'some unknown property',
}

let fetchTestApi: (options: RequestInit, path?: string) => Promise<{ status: number, json: any }>

const createFetchFunction = (token: string) => {
	fetchTestApi = (options, path = '') => (
		fetchApi(`tests/${path}`, options, token)
	)
}

const login = async () => {
	const { json } = await fetchApi('auth/login', {
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			username: 'dima',
			password: 'zorin',
		}),
	})
	expect(json?.token).toBeString()
	createFetchFunction(json.token)
}

const createDocument = async () => {
	const body = new FormData()
	forIn(testDocument, (value, key) => {
		body.append(key, value)
	})
	const { json } = await fetchTestApi({ method: 'post', body })
	expect(json?.id).toBeString()
	testDocument.id = json.id
}

const cleanUpDb = async () => {
	const testCollectionName = 'tests'
	const dbClient = await connectToDb()
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
	const { json } = await fetchTestApi({}, id)
	expect(json).toEqual(expect.objectContaining({ id, name, desc }))
	expect(json.wrongProp).toBeUndefined()
})

test('Find a list of documents', async () => {
	const query = new URLSearchParams({
		filter: '{"name": "create"}',
		sort: '["name", 1]',
		range: '[0, 25]',
	})
	const { json } = await fetchTestApi({}, `?${query}`)
	expect(json).toBeArray()
	json.forEach((e: any) => {
		expect(e).toContainAllKeys(['id', 'name', 'desc', 'createdAt'])
	})
})

test('Update a document', async () => {
	const { id, wrongProp } = testDocument
	const updatedTestDocument = {
		id,
		name: 'updated test resource',
		desc: 'updated test resource description',
		wrongProp,
	}
	
	const updateBody = new FormData()
	forIn(updatedTestDocument, (value, key) => {
		updateBody.append(key, value)
	})
	await fetchTestApi({ method: 'put', body: updateBody }, id)
	
	const { json } = await fetchTestApi({}, id)
	const { wrongProp: _, ...expectedProps } = updatedTestDocument
	expect(json).toEqual(expect.objectContaining(expectedProps))
	expect(json.wrongProp).toBeUndefined()
})

test('Delete a document', async () => {
	const { id } = testDocument
	await fetchTestApi({ method: 'delete' }, id)
	const { json } = await fetchTestApi({}, id)
	expect(json?.error?.message).toBe('Not found')
})
