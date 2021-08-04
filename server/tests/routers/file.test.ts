import { createReadStream } from 'fs'
import fetch from 'node-fetch'
import { Readable } from 'stream'
import gridFs from '../../src/services/gridfs'
import { FileInfo } from '../../src/services/types'
import { login, TEST_COLLECTION_NAME } from '../helpers'

let token: string
let fileInfo: FileInfo

const uploadFile = async () => {
	const fileService = await gridFs()
	const fileStream = createReadStream(require.resolve('../test.pdf'))
	fileInfo = await fileService.upload(TEST_COLLECTION_NAME, fileStream, '') as FileInfo
	expect(fileInfo).toBeObject()
}

beforeAll(async () => token = await login())
beforeEach(uploadFile)

test('Download a file', async () => {
	const headers = { authorization: `Bearer ${token}` }
	const res = await fetch(fileInfo.url, { headers })
	expect(res.body).toBeInstanceOf(Readable)
})
