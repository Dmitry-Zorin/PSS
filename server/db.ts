import chalk from 'chalk'
import { Db, GridFSBucket, MongoClient, ObjectId } from 'mongodb'
import logger from './logger'
import { projectTruthyProps } from './utils'
import { isEmpty } from 'lodash'
import { Readable } from 'stream'
import { createNotFoundError, noPropsError, wrongIdFormatError } from './errors'
import { Projection } from './projections/projection.interface'
import { Dictionary } from 'lodash'

export let db: Db
export let fileDb: Db

const connectToDb = async () => {
	const { DB_URI, DB_NAME, FILE_DB_NAME } = process.env
	
	if (!DB_URI || !DB_NAME || !FILE_DB_NAME) {
		return Promise.reject('Database environment variables are not set')
	}
	
	logger.start('Connecting to the database...')
	
	const client = new MongoClient(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	
	try {
		await client.connect()
	}
	catch (err) {
		logger.fail('Connection to the database failed')
		return Promise.reject(err)
	}
	
	db = client.db(DB_NAME)
	fileDb = client.db(FILE_DB_NAME)
	
	logger.succeed(`Connected to database ${chalk.blue(DB_NAME)}`)
	return client
}

export default connectToDb

interface DocumentResult {
	error?: any,
	doc?: any
	docs?: any[],
}

export const addDocument = async <T>(
	collectionName: string,
	document: Dictionary<T>,
	projection: Projection,
	file?: Express.Multer.File,
) => {
	const result: DocumentResult = {}
	const payload: any = projectTruthyProps(document, projection)
	
	if (file) {
		try {
			payload.fileId = await addFile(collectionName, file)
		}
		catch (err) {
			console.error(err)
			// TODO: Notify that the file failed to be uploaded
		}
	}
	
	if (isEmpty(payload)) {
		result.error = noPropsError
		return result
	}
	
	try {
		const coll = db.collection(collectionName)
		const res = await coll.insertOne(payload)
		result.doc = { id: res.insertedId }
	}
	catch (err) {
		result.error = err
	}
	
	return result
}

export const getDocuments = async (collectionName: string, pipeline: object[]) => {
	const result: DocumentResult = {}
	
	try {
		const coll = db.collection(collectionName)
		result.docs = await coll.aggregate(pipeline).toArray()
	}
	catch (err) {
		result.error = err
	}
	
	return result
}

export const getDocument = async (collectionName: string, documentId: string, projection: Projection) => {
	const result: DocumentResult = {}
	
	if (!ObjectId.isValid(documentId)) {
		result.error = wrongIdFormatError
		return result
	}
	
	try {
		const _id = new ObjectId(documentId)
		const coll = db.collection(collectionName)
		const doc = await coll.findOne({ _id }, { projection })
		
		if (!doc) {
			result.error = createNotFoundError()
			return result
		}
		
		result.doc = doc
	}
	catch (err) {
		result.error = err
	}
	
	return result
}

export const updateDocument = async <T>(
	collectionName: string,
	documentId: string,
	updateDocument: Dictionary<T>,
	projection: Projection,
	file?: Express.Multer.File,
) => {
	const result: DocumentResult = {}
	const payload: any = projectTruthyProps(updateDocument, projection)
	
	if (!ObjectId.isValid(documentId)) {
		result.error = wrongIdFormatError
		return result
	}
	
	if (file) {
		try {
			payload.fileId = await addFile(collectionName, file)
		}
		catch (err) {
			console.error(err)
			// TODO: Notify that the file failed to be uploaded
		}
	}
	
	if (isEmpty(payload)) {
		result.error = noPropsError
		return result
	}
	
	try {
		const _id = new ObjectId(documentId)
		const coll = db.collection(collectionName)
		const { value } = await coll.findOneAndUpdate({ _id }, { $set: payload })
		
		if (!value) {
			result.error = createNotFoundError()
		}
		
		if (value?.fileId) {
			deleteFile(collectionName, value.fileId)
		}
	}
	catch (err) {
		result.error = err
	}
	
	return result
}

export const deleteDocument = async (collectionName: string, documentId: string) => {
	const result: DocumentResult = {}
	
	if (!ObjectId.isValid(documentId)) {
		result.error = wrongIdFormatError
		return result
	}
	
	try {
		const _id = new ObjectId(documentId)
		const coll = db.collection(collectionName)
		const projection = { fileId: 1 }
		const { value } = await coll.findOneAndDelete({ _id }, { projection })
		
		if (value?.fileId) {
			deleteFile(collectionName, value.fileId)
		}
	}
	catch (err) {
		result.error = err
	}
	
	return result
}

export const addFile = (collectionName: string, file: Express.Multer.File) => {
	const bucket = new GridFSBucket(fileDb, { bucketName: collectionName })
	const uploadStream = bucket.openUploadStream(file.originalname)
	const { id } = uploadStream
	
	return new Promise((resolve, reject) => {
		Readable.from(file.buffer)
			.pipe(uploadStream)
			.once('error', reject)
			.once('finish', () => resolve(id))
	})
}

export const deleteFile = (collectionName: string, fileId: string) => {
	if (!ObjectId.isValid(fileId)) {
		return
	}
	const bucket = new GridFSBucket(fileDb, { bucketName: collectionName })
	bucket.delete(new ObjectId(fileId), (error) => {
		if (error) {
			console.error(error)
			// TODO: Add mechanism to keep track of the files that failed to be deleted
		}
	})
}
