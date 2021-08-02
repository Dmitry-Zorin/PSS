import { GridFSBucket, ObjectId } from 'mongodb'
import { createEnvError, wrongIdFormatError } from '../utils/errors'
import getClient from './mongo-client'
import { FileService } from './types'

const { FILE_DB_NAME, SERVER } = process.env

if (!FILE_DB_NAME) {
	throw createEnvError('file_db_name')
}

const getFileService = async (): Promise<FileService> => {
	const client = await getClient()
	const fileDb = client.db(FILE_DB_NAME)
	
	const getGridFSBucket = (bucketName: string) => (
		new GridFSBucket(fileDb, { bucketName })
	)
	
	return {
		upload: async (bucketName, file, filename) => {
			if (!bucketName || !file) return null
			
			const bucket = getGridFSBucket(bucketName)
			const uploadStream = bucket.openUploadStream(filename)
			
			const fileInfo = {
				id: uploadStream.id.toString(),
				name: filename,
				url: `${SERVER}/files/${uploadStream.id}`,
			}
			
			return new Promise(resolve => {
				file.pipe(uploadStream)
					.once('error', () => resolve(null))
					.once('finish', () => resolve(fileInfo))
			})
		},
		
		download: (bucketName, fileId) => {
			if (!ObjectId.isValid(fileId)) {
				throw wrongIdFormatError
			}
			const bucket = getGridFSBucket(bucketName)
			return bucket.openDownloadStream(new ObjectId(fileId))
		},
		
		remove: async (bucketName, fileId) => {
			if (!ObjectId.isValid(fileId)) return
			
			return new Promise((resolve, reject) => {
				const bucket = getGridFSBucket(bucketName)
				bucket.delete(new ObjectId(fileId), (error) => {
					if (!error) return resolve()
					
					console.error(error)
					// TODO: Add mechanism to keep track of the files that failed to be deleted
					reject()
				})
			})
		},
	}
}

export default getFileService
