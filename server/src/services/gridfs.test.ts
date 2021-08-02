import { createReadStream } from 'fs'
import { Readable } from 'stream'
import gridFs from './gridfs'
import { disconnect } from './mongo-client'

const bucketName = 'tests'
const filename = 'test file'

let fileService: any
let fileInfo: any

const uploadFile = async () => {
	fileService = await gridFs()
	const fileStream = createReadStream(require.resolve('./test.pdf'))
	fileInfo = await fileService.upload(bucketName, fileStream, filename)
	expect(fileInfo).toBeObject()
	
	const { id, name, url } = fileInfo!
	expect(id).toBeString()
	expect(name).toBe(filename)
	expect(url).toContain(id)
}

beforeEach(uploadFile)
afterAll(disconnect)

test('Download a file', async () => {
	const fileStream = await fileService.download(bucketName, fileInfo.id)
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
	await fileService.remove(bucketName, fileInfo.id)
	const fileStream = await fileService.download(bucketName, fileInfo.id)
	
	const promise = new Promise((resolve, reject) => {
		fileStream
			.on('data', () => {})
			.once('end', resolve)
			.once('error', reject)
	})
	
	await expect(promise).toReject()
})
