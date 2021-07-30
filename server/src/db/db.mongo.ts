import { isEmpty, isString } from 'lodash'
import { ObjectId } from 'mongodb'
import { FileService } from '../services/file/file.types'
import {
	createConflictError,
	createNotFoundError,
	noPropsError,
	wrongIdFormatError,
} from '../utils/errors'
import { projectNonNullishProps } from '../utils/utils'
import getClient from './client.mongo'
import { DbService, Filter } from './db.types'

const getFilter = (argument: string | Filter) => {
	if (!isString(argument)) {
		return argument
	}
	if (!ObjectId.isValid(argument)) {
		throw wrongIdFormatError
	}
	return { _id: new ObjectId(argument) }
}

const getDbService = async (fileService: FileService): Promise<DbService> => {
	const client = await getClient()
	const db = client.db(process.env.DB_NAME)
	
	const getCollection = (collectionName: string) => (
		db.collection(collectionName)
	)
	
	return {
		getCollectionNames: async () => {
			const collections = await db.collections()
			return collections.map(e => e.collectionName)
		},
		
		getDocumentCount: (collectionName) => (
			getCollection(collectionName).estimatedDocumentCount()
		),
		
		addDocument: async (collectionName, document, projection = { _id: 0 }, file) => {
			const fileInfo = await fileService.upload(collectionName, file)
			const docWithFile = { ...document, file: fileInfo }
			const payload = projectNonNullishProps(docWithFile, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const coll = getCollection(collectionName)
			const resp = await coll.insertOne(payload).catch(err => {
				throw err.code === 11000 ? createConflictError() : err
			})
			return { id: resp.insertedId }
		},
		
		getDocuments: (collectionName, pipeline) => {
			const coll = getCollection(collectionName)
			return coll.aggregate(pipeline).toArray()
		},
		
		getDocument: async (collectionName, filterOrId, projection) => {
			const coll = getCollection(collectionName)
			const filter = getFilter(filterOrId)
			const doc = await coll.findOne(filter, { projection })
			
			if (!doc) throw createNotFoundError()
			return doc
		},
		
		updateDocument: async (
			collectionName,
			filterOrId,
			updateDocument,
			projection = { _id: 0 },
			file,
		) => {
			const fileInfo = await fileService.upload(collectionName, file)
			const docWithFile = { ...updateDocument, file: fileInfo }
			const payload = projectNonNullishProps(docWithFile, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const coll = getCollection(collectionName)
			const filter = getFilter(filterOrId)
			const update = { $set: payload }
			const options = { projection: { file: { id: 1 } } }
			const { value } = await coll.findOneAndUpdate(filter, update, options)
			
			if (!value) throw createNotFoundError()
			
			if (value?.file?.id) {
				fileService.remove(collectionName, value.file.id)
			}
		},
		
		deleteDocument: async (collectionName, filterOrId) => {
			const coll = getCollection(collectionName)
			const filter = getFilter(filterOrId)
			const options = { projection: { file: { id: 1 } } }
			const { value } = await coll.findOneAndDelete(filter, options)
			
			if (value?.file?.id) {
				fileService.remove(collectionName, value.file.id)
			}
		},
	}
}

export default getDbService
