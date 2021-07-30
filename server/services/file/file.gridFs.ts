import { GridFSBucket, ObjectId } from 'mongodb'
import { Readable } from 'stream'
import getClient from '../../db/client.mongo'
import { createEnvError, wrongIdFormatError } from '../../utils/errors'
import { FileService } from './file.types'

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
		upload: async (collectionName, file) => {
			if (!file) return null
			
			const bucket = getGridFSBucket(collectionName)
			const uploadStream = bucket.openUploadStream(file.originalname)
			const fileInfo = {
				id: uploadStream.id as string,
				name: file.originalname,
				url: `${SERVER}/files/${uploadStream.id}`,
			}
			
			return new Promise(resolve => {
				Readable.from(file.buffer)
					.pipe(uploadStream)
					.once('error', () => resolve(null))
					.once('finish', () => resolve(fileInfo))
			})
		},
		
		download: (collectionName: string, fileId: string) => {
			if (!ObjectId.isValid(fileId)) {
				throw wrongIdFormatError
			}
			const bucket = getGridFSBucket(collectionName)
			return bucket.openDownloadStream(new ObjectId(fileId))
		},
		
		remove: (collectionName: string, fileId: string) => {
			if (!ObjectId.isValid(fileId)) return
			
			const bucket = getGridFSBucket(collectionName)
			bucket.delete(new ObjectId(fileId), (error) => {
				if (!error) return
				
				console.error(error)
				// TODO: Add mechanism to keep track of the files that failed to be deleted
			})
		},
	}
}

export default getFileService
