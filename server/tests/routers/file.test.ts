import { createReadStream } from 'fs'
import fetch from 'node-fetch'
import { Readable } from 'stream'
import gridFs from '../../src/services/gridfs'
import { login, TEST_COLLECTION_NAME } from '../helpers'

let token: string
let fileId: string

const uploadFile = async () => {
	const fileService = await gridFs()
	const fileStream = createReadStream(require.resolve('../test.pdf'))
	const uploadStream = fileService.upload(TEST_COLLECTION_NAME, fileStream, '')
	fileId = uploadStream.id.toString()
	await new Promise(resolve => {
		uploadStream.on('finish', resolve)
	})
}

beforeAll(async () => token = await login())
beforeEach(uploadFile)

test('Download a file', async () => {
	const headers = { authorization: `Bearer ${token}` }
	const fileUrl = `${process.env.SERVER}/files/${TEST_COLLECTION_NAME}/${fileId}`
	const res = await fetch(fileUrl, { headers })
	expect(res.body).toBeInstanceOf(Readable)
})
