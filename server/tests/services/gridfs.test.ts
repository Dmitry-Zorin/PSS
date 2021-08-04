import { createReadStream } from 'fs'
import { Readable } from 'stream'
import gridFs from '../../src/services/gridfs'
import { FileInfo, FileService } from '../../src/services/types'
import { TEST_COLLECTION_NAME } from '../helpers'

const filename = 'test file'

let fileService: FileService
let fileInfo: FileInfo

const uploadFile = async () => {
	fileService = await gridFs()
	const fileStream = createReadStream(require.resolve('../test.pdf'))
	fileInfo = await fileService.upload(TEST_COLLECTION_NAME, fileStream, filename) as FileInfo
	expect(fileInfo).toBeObject()
	
	const { id, name, url } = fileInfo
	expect(id).toBeString()
	expect(name).toBe(filename)
	expect(url).toContain(id)
}

beforeEach(uploadFile)

test('Download a file', async () => {
	const fileStream = await fileService.download(TEST_COLLECTION_NAME, fileInfo.id)
	expect(fileStream).toBeInstanceOf(Readable)
	
	const promise = new Promise<void>((resolve, reject) => {
		fileStream
			.once('file', (data: any) => {
				expect(data).toBeObject()
				expect(data._id.toString()).toBe(fileInfo.id)
				expect(data.filename).toBe(fileInfo.name)
			})
			.on('data', (data: any) => expect(data).toBeObject())
			.once('end', resolve)
			.once('error', reject)
	})
	
	await expect(promise).toResolve()
})

test('Delete a file', async () => {
	await fileService.remove(TEST_COLLECTION_NAME, fileInfo.id)
	const fileStream = await fileService.download(TEST_COLLECTION_NAME, fileInfo.id)
	
	const promise = new Promise((resolve, reject) => {
		fileStream
			.on('data', () => {})
			.once('end', resolve)
			.once('error', reject)
	})
	
	await expect(promise).toReject()
})
