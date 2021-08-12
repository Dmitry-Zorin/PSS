import { Readable } from 'stream'
import { finished } from 'stream/promises'
import gridFs from '../../src/services/gridfs'
import { FsService } from '../../src/services/types'
import { TEST_COLLECTION_NAME } from '../helpers'

const filename = 'test file'

let fs: FsService
let fileId: string

const uploadFile = async () => {
	const file = Readable.from(filename)
	const { id, stream } = fs.upload(TEST_COLLECTION_NAME, file, filename)
	await finished(stream)
	fileId = id
}

beforeAll(async () => fs = await gridFs())
beforeEach(uploadFile)

test('Download a file', async () => {
	const { file, stream } = await fs.download(TEST_COLLECTION_NAME, fileId)
	expect(file).toEqual(expect.objectContaining({ filename }))
	
	const chunks: string[] = []
	await finished(stream.on('data', e => chunks.push(e)))
	expect(chunks.join()).toBe(filename)
})

test('Delete a file', async () => {
	await fs.delete(TEST_COLLECTION_NAME, fileId)
	const promise = fs.download(TEST_COLLECTION_NAME, fileId)
	await expect(promise).toReject()
})
