import FormData from 'form-data'
import { createReadStream } from 'fs'
import getClient, { disconnect } from '../services/mongo-client'
import { fetchApi, stringifyValues } from '../utils/utils'

const collection = 'tests'

const document = {
	id: '',
	name: 'test name',
	desc: 'test description',
}

const createFileStream = () => (
	createReadStream(require.resolve('./test.pdf'))
)

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
	expect(json.error).toBeUndefined()
	expect(json.token).toBeString()
	createFetchFunction(json.token)
}

const createDocument = async () => {
	const entries = Object.entries({
		...document,
		file: createFileStream(),
	})
	const body = entries.reduce((result, entry) => {
		result.append(...entry)
		return result
	}, new FormData())
	
	const { json } = await fetchTestApi('', { method: 'post', body })
	expect(json.error).toBeUndefined()
	expect((document.id = json.id)).toBeString()
}

const cleanUpDb = async () => {
	const dbClient = await getClient()
	const db = dbClient.db(process.env.DB_NAME)
	const fileDb = dbClient.db(process.env.FILE_DB_NAME)
	await Promise.all([
		db.collection(collection).drop(),
		fileDb.collection(`${collection}.files`).drop(),
		fileDb.collection(`${collection}.chunks`).drop(),
	])
	await disconnect()
}

beforeAll(login)
beforeEach(createDocument)
afterAll(cleanUpDb)

test('Find a document', async () => {
	const file = expect.any(Object)
	const { json } = await fetchTestApi(document.id)
	expect(json).toEqual(expect.objectContaining({ ...document, file }))
	expect(json.file).toContainAllKeys(['id', 'name', 'url'])
})

test('Find a list of documents', async () => {
	const query = new URLSearchParams(stringifyValues({
		filter: { name: document.name },
		sort: { name: 1 },
		skip: 0,
		limit: 25,
	}))
	
	const { json } = await fetchTestApi(`?${query}`)
	expect(json).toBeArray()
	expect(json.length).toBeGreaterThan(0)
	
	const fields = ['id', 'name', 'desc', 'createdAt', 'file']
	expect(json).toEqual(json.map(() => expect.toContainAllKeys(fields)))
})

test('Update a document', async () => {
	const updatedDocument = {
		name: 'updated test resource',
		desc: 'updated test resource description',
		file: createFileStream(),
	}
	const entries = Object.entries(updatedDocument)
	const body = entries.reduce((result, entry) => {
		result.append(...entry)
		return result
	}, new FormData())
	
	const { id } = document
	await fetchTestApi(id, { method: 'put', body })
	
	const { file, ...expectedProps } = updatedDocument
	const { json } = await fetchTestApi(id)
	expect(json).toEqual(expect.objectContaining(expectedProps))
	expect(json.file).toContainAllKeys(['id', 'name', 'url'])
})

test('Delete a document', async () => {
	const { id } = document
	await fetchTestApi(id, { method: 'delete' })
	
	const { status, json } = await fetchTestApi(id)
	expect(status).toBe(404)
	expect(json.error?.name).toBe('NotFoundError')
})
