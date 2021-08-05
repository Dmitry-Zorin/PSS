import { createReadStream } from 'fs'
import {
	createFetchFunction,
	createFormData,
	FetchFunction,
	stringifyValues,
	TEST_COLLECTION_NAME,
} from '../helpers'

const document = {
	id: '',
	name: 'test name',
	desc: 'test description',
}

const createFileStream = () => (
	createReadStream(require.resolve('../test.pdf'))
)

let fetchTestApi: FetchFunction

const createDocument = async () => {
	const body = createFormData({
		...document,
		file: createFileStream(),
	})
	const { json } = await fetchTestApi('', { method: 'post', body })
	expect(json.error).toBeUndefined()
	expect((document.id = json.id)).toBeString()
}

beforeAll(async () => {
	fetchTestApi = await createFetchFunction(TEST_COLLECTION_NAME)
})

beforeEach(createDocument)

test('Find a document', async () => {
	const file = expect.any(Object)
	const { json } = await fetchTestApi(document.id)
	expect(json).toEqual(expect.objectContaining({ ...document, file }))
	expect(json.file).toContainAllKeys(['id', 'name', 'url'])
})

test('Find a list of documents', async () => {
	const query = JSON.stringify(stringifyValues({
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
		name: 'updated test name',
		desc: 'updated test description',
		file: createFileStream(),
	}
	
	const { id } = document
	const body = createFormData(updatedDocument)
	await fetchTestApi(id, { method: 'put', body })
	
	const { file, ...expectedProps } = updatedDocument
	const { json } = await fetchTestApi(id)
	expect(json).toEqual(expect.objectContaining(expectedProps))
	expect(json.file).toContainAllKeys(['id', 'name', 'url'])
})

test('Delete a document', async () => {
	const { id } = document
	await fetchTestApi(id, { method: 'delete' })
	
	const { json } = await fetchTestApi(id)
	expect(json.error).toBeObject()
	expect(json.error.name).toBe('NotFoundError')
})
