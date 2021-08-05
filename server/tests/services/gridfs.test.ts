import { createReadStream } from 'fs'
import { Readable } from 'stream'
import gridFs from '../../src/services/gridfs'
import { FileService } from '../../src/services/types'
import { TEST_COLLECTION_NAME } from '../helpers'

const filename = 'test file'

let fileService: FileService
let fileId: string

const uploadFile = async () => {
	fileService = await gridFs()
	const fileStream = createReadStream(require.resolve('../test.pdf'))
	const uploadStream = fileService.upload(TEST_COLLECTION_NAME, fileStream, filename)
	fileId = uploadStream.id.toString()
	await new Promise(resolve => {
		uploadStream.on('finish', resolve)
	})
}

beforeEach(uploadFile)

test('Download a file', async () => {
	const fileStream = await fileService.download(TEST_COLLECTION_NAME, fileId)
	expect(fileStream).toBeInstanceOf(Readable)
	
	const promise = new Promise<void>((resolve, reject) => {
		fileStream
			.once('file', (data: any) => {
				expect(data).toBeObject()
				expect(data._id.toString()).toBe(fileId)
			})
			.on('data', (data: any) => expect(data).toBeObject())
			.once('end', resolve)
			.once('error', reject)
	})
	
	await expect(promise).toResolve()
})

test('Delete a file', async () => {
	await fileService.remove(TEST_COLLECTION_NAME, fileId)
	const fileStream = await fileService.download(TEST_COLLECTION_NAME, fileId)
	
	const promise = new Promise((resolve, reject) => {
		fileStream
			.on('data', () => {})
			.once('end', resolve)
			.once('error', reject)
	})
	
	await expect(promise).toReject()
})
