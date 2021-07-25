import FormData from 'form-data'
import dotenv from 'dotenv'
import { fetchApi } from '../utils'
import 'jest-extended'
import connectToDb, { db, fileDb } from '../db'
import { RequestInit } from 'node-fetch'
import { forIn } from 'lodash'
import fs from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'

dotenv.config()

const testCollectionName = 'tests'

const testDocument = {
	id: '',
	name: 'test document',
	desc: 'test document description',
	wrongProp: 'some unknown property',
}

const getFile = () => (
	fs.createReadStream(path.join(__dirname, 'test.pdf'))
)

let dbClient: MongoClient

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
	body.append('file', getFile())
	forIn(testDocument, (value, key) => {
		body.append(key, value)
	})
	const { json } = await fetchTestApi({ method: 'post', body })
	expect(json?.id).toBeString()
	testDocument.id = json.id
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
	const { json } = await fetchTestApi({}, id)
	expect(json).toEqual(expect.objectContaining({ id, name, desc, fileId }))
	expect(json.wrongProp).toBeUndefined()
})

test('Find a list of documents', async () => {
	const query = new URLSearchParams({
		filter: JSON.stringify({ name: testDocument.name }),
		sort: '["name", 1]',
		range: '[0, 25]',
	})
	const { json } = await fetchTestApi({}, `?${query}`)
	expect(json?.length).toBeGreaterThan(0)
	json.forEach((e: any) => {
		expect(e).toContainAllKeys(['id', 'name', 'desc', 'createdAt', 'fileId'])
	})
})

test('Update a document', async () => {
	const { id, wrongProp } = testDocument
	const updatedTestDocument = {
		id,
		name: 'updated test resource',
		desc: 'updated test resource description',
		file: getFile(),
		wrongProp,
	}
	
	const resp = await fetchTestApi({}, id)
	const fileId = resp.json.fileId
	expect(fileId).toBeString()
	
	const updateBody = new FormData()
	forIn(updatedTestDocument, (value, key) => {
		updateBody.append(key, value)
	})
	await fetchTestApi({ method: 'put', body: updateBody }, id)
	
	const { json } = await fetchTestApi({}, id)
	const { wrongProp: _, file, ...expectedProps } = updatedTestDocument
	expect(json).toEqual(expect.objectContaining(expectedProps))
	expect(json.fileId).not.toBe(fileId)
	expect(json.wrongProp).toBeUndefined()
})

test('Delete a document', async () => {
	const { id } = testDocument
	
	const resp = await fetchTestApi({}, id)
	expect(resp.json?.error).toBeUndefined()
	const fileId = resp.json?.fileId
	
	await fetchTestApi({ method: 'delete' }, id)
	
	const { status, json } = await fetchTestApi({}, id)
	expect(status).toBe(404)
	expect(json?.error?.name).toBe('NotFoundError')
	
	if (!dbClient) {
		dbClient = await connectToDb()
	}
	const coll = fileDb.collection(`${testCollectionName}.files`)
	const file = await coll.findOne({ _id: fileId })
	expect(file).toBeFalsy()
})
