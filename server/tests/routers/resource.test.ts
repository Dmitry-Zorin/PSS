import FormData from 'form-data'
import { createReadStream } from 'fs'
import { stringifyValues } from '../../src/utils/utils'
import { createFetchFunction, FetchFunction, TEST_COLLECTION_NAME } from '../helpers'

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
	
	const { json } = await fetchTestApi(id)
	expect(json.error).toBeObject()
	expect(json.error.name).toBe('NotFoundError')
})
