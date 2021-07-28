import chalk from 'chalk'
import { isEmpty, isString } from 'lodash'
import { GridFSBucket, MongoClient, ObjectId } from 'mongodb'
import { Readable } from 'stream'
import {
	createConflictError,
	createNotFoundError,
	noPropsError,
	wrongIdFormatError,
} from '../errors'
import logger from '../logger'
import { projectNonNullishProps } from '../utils'
import { DbService, FileService, Filter } from './types'

const EXIT_SIGNALS = ['SIGINT', 'SIGHUP', 'SIGTERM']

const { DB_URI, DB_NAME, FILE_DB_NAME, SERVER } = process.env

if (!DB_URI || !DB_NAME || !FILE_DB_NAME) {
	throw 'Database environment variables are not set'
}

const client = new MongoClient(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

EXIT_SIGNALS.forEach((signal) => {
	process.on(signal, async (code) => {
		if (client.isConnected()) {
			await client.close()
		}
		process.exit(code)
	})
})

const connect = async () => {
	if (client.isConnected()) return
	logger.start('Connecting to the database...')
	await client.connect().catch((err) => {
		logger.fail('Connection to the database failed')
		throw err
	})
	logger.succeed(`Connected to database ${chalk.blue(DB_NAME)}`)
}

const _getFileService = (): FileService => {
	const fileDb = client.db(FILE_DB_NAME)
	
	const getGridFSBucket = (bucketName: string) => (
		new GridFSBucket(fileDb, { bucketName })
	)
	
	return {
		addFile: async (collectionName, file) => {
			if (!file) return null
			
			const bucket = getGridFSBucket(collectionName)
			const uploadStream = bucket.openUploadStream(file.originalname)
			const fileInfo = {
				id: uploadStream.id as string,
				name: file.originalname,
				url: `${SERVER}/files/${uploadStream.id}`,
			}
			
			return new Promise((resolve) => {
				Readable.from(file.buffer)
					.pipe(uploadStream)
					.once('error', () => resolve(null))
					.once('finish', () => resolve(fileInfo))
			})
		},
		
		getFile: (collectionName: string, fileId: string) => {
			if (!ObjectId.isValid(fileId)) {
				throw wrongIdFormatError
			}
			const bucket = getGridFSBucket(collectionName)
			return bucket.openDownloadStream(new ObjectId(fileId))
		},
		
		deleteFile: (collectionName: string, fileId: string) => {
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

export const getFileService = () => (
	connect().then(_getFileService)
)

const getFilter = (argument: string | Filter) => {
	if (!isString(argument)) {
		return argument
	}
	if (!ObjectId.isValid(argument)) {
		throw wrongIdFormatError
	}
	return { _id: new ObjectId(argument) }
}

const _getDbService = (fileService: FileService): DbService => {
	const db = client.db(DB_NAME)
	
	const getCollection = (collectionName: string) => (
		db.collection(collectionName)
	)
	
	return {
		fileService,
		
		getCollectionNames: async () => {
			const collections = await db.collections()
			return collections.map(e => e.collectionName)
		},
		
		getDocumentCount: (collectionName) => (
			getCollection(collectionName).estimatedDocumentCount()
		),
		
		addDocument: async (collectionName, document, projection = { _id: 0 }, file) => {
			const fileInfo = await fileService.addFile(collectionName, file)
			const docWithFile = { ...document, file: fileInfo }
			const payload = projectNonNullishProps(docWithFile, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const coll = getCollection(collectionName)
			const resp = await coll.insertOne(payload).catch((err) => {
				throw err.code === 11000 ? createConflictError() : err
			})
			return { id: resp.insertedId }
		},
		
		getDocuments: (collectionName, pipeline) => {
			const coll = getCollection(collectionName)
			return coll.aggregate(pipeline).toArray()
		},
		
		getDocument: async (collectionName, arg2, projection) => {
			const coll = getCollection(collectionName)
			const doc = await coll.findOne(getFilter(arg2), { projection })
			
			if (!doc) throw createNotFoundError()
			return doc
		},
		
		updateDocument: async (
			collectionName,
			arg2,
			updateDocument,
			projection = { _id: 0 },
			file,
		) => {
			const fileInfo = await fileService.addFile(collectionName, file)
			const docWithFile = { ...updateDocument, file: fileInfo }
			const payload = projectNonNullishProps(docWithFile, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const coll = getCollection(collectionName)
			const filter = getFilter(arg2)
			const update = { $set: payload }
			const options = { projection: { file: { id: 1 } } }
			const { value } = await coll.findOneAndUpdate(filter, update, options)
			
			if (!value) throw createNotFoundError()
			
			if (value?.file?.id) {
				fileService.deleteFile(collectionName, value.file.id)
			}
		},
		
		deleteDocument: async (collectionName, arg2) => {
			const coll = getCollection(collectionName)
			const options = { projection: { file: { id: 1 } } }
			const { value } = await coll.findOneAndDelete(getFilter(arg2), options)
			
			if (value?.file?.id) {
				fileService.deleteFile(collectionName, value.file.id)
			}
		},
	}
}

const getDbService = (fileService: FileService) => (
	connect().then(() => _getDbService(fileService))
)

export default getDbService
