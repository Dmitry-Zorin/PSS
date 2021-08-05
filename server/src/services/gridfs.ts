import { GridFSBucket, ObjectId } from 'mongodb'
import { createEnvError, createNotFoundError, wrongIdFormatError } from '../helpers/errors'
import getClient from './mongo-client'
import { FileService } from './types'

const { FILE_DB_NAME } = process.env

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
		getFileInfo: async (bucketName, fileId, projection) => {
			if (!ObjectId.isValid(fileId)) {
				throw wrongIdFormatError
			}
			
			const _id = new ObjectId(fileId)
			const bucket = getGridFSBucket(bucketName)
			const doc = await bucket.find({ _id }, { projection })
			
			if (!doc) throw createNotFoundError('File not found')
			
			return doc
		},
		
		upload: (bucketName, file, filename) => {
			const bucket = getGridFSBucket(bucketName)
			const uploadStream = bucket.openUploadStream(filename)
			return file.pipe(uploadStream as any) as any
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
