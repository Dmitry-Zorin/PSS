import { Readable } from 'stream'
import { finished } from 'stream/promises'
import { createFetchFunction, createFormData, TEST_COLLECTION_NAME } from '../helpers'

const filename = 'test file'
const file = Readable.from(filename)
const body = createFormData({ file }, filename)

test('Download a file', async () => {
	const fetchTestApi = await createFetchFunction(TEST_COLLECTION_NAME)
	
	const res = await fetchTestApi('', { method: 'post', body })
	const { json: { file: { url } } } = await fetchTestApi(res.json.id)
	const { body: stream } = await fetchTestApi(url, {}, false)
	
	const chunks: string[] = []
	await finished(stream.on('data', e => chunks.push(e)))
	expect(chunks.join()).toBe(filename)
})
