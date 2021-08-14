import { memoize } from 'lodash'
import { GridFSBucket, ObjectId } from 'mongodb'
import { pipeline } from 'stream'
import { createGunzip, createGzip } from 'zlib'
import { EnvError, NotFoundError, wrongIdFormatError } from '../helpers/errors'
import file from '../routers/file'
import client from './mongo-client'
import { FsService } from './types'

const { FILE_DB_NAME } = process.env

if (!FILE_DB_NAME) {
	throw EnvError('file_db_name')
}

const getFsService = async (): Promise<FsService> => {
	await client.connect()
	const fileDb = client.db(FILE_DB_NAME)
	
	const getGridFSBucket = memoize((bucketName: string) => (
		new GridFSBucket(fileDb, { bucketName })
	))
	
	return {
		upload: (bucketName, file, filename) => {
			const bucket = getGridFSBucket(bucketName)
			const uploadSteam = bucket.openUploadStream(filename)
			const gzip = createGzip()
			return {
				id: uploadSteam.id.toString(),
				stream: pipeline(file, gzip, uploadSteam as any, () => {}),
			}
		},
		
		download: async (bucketName, fileId) => {
			if (!ObjectId.isValid(fileId)) {
				throw wrongIdFormatError
			}
			const fileObjectId = new ObjectId(fileId)
			const bucket = getGridFSBucket(bucketName)
			const downloadStream = bucket.openDownloadStream(fileObjectId)
			
			const filePromise = new Promise((resolve, reject) => {
				downloadStream
					.on('file', resolve)
					.on('error', reject)
					.read()
			})
			
			const file: any = await filePromise.catch(() => {
				throw NotFoundError('File not found')
			})
			
			const gunzip = createGunzip()
			const stream = pipeline(downloadStream, gunzip, () => {})
			return { file, stream }
		},
		
		delete: async (bucketName, fileId) => {
			if (!ObjectId.isValid(fileId)) return
			const fileObjectId = new ObjectId(fileId)
			const bucket = getGridFSBucket(bucketName)
			return bucket.delete(fileObjectId).catch(err => {
				if (!err) return
				console.error(err)
			})
		},
	}
}

export default getFsService
