import { isEmpty, isString } from 'lodash'
import { ObjectId } from 'mongodb'
import {
	createConflictError,
	createNotFoundError,
	noPropsError,
	wrongIdFormatError,
} from '../utils/errors'
import { projectNonNullishProps } from '../utils/utils'
import getClient from './mongo-client'
import { DbService, Filter } from './types'

const emptyProjection = { _id: 0 } as const

const getFilter = (argument: string | Filter) => {
	if (isString(argument)) {
		if (!ObjectId.isValid(argument)) {
			throw wrongIdFormatError
		}
		return { _id: new ObjectId(argument) }
	}
	
	const id = argument._id
	if (!id) return argument
	
	if (!ObjectId.isValid(id)) {
		throw wrongIdFormatError
	}
	return {
		...argument,
		_id: new ObjectId(id.toString()),
	}
}

const getDbService = async (): Promise<DbService> => {
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
		
		addDocument: async (collectionName, document, projection = emptyProjection) => {
			const payload = projectNonNullishProps(document, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const coll = getCollection(collectionName)
			const { insertedId } = await coll.insertOne(payload).catch(err => {
				throw err.code === 11000 ? createConflictError() : err
			})
			return { id: insertedId.toString() }
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
			projection = emptyProjection,
		) => {
			const payload = projectNonNullishProps(updateDocument, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const coll = getCollection(collectionName)
			const filter = getFilter(filterOrId)
			const update = { $set: payload }
			const options = { projection: { file: { id: 1 } } }
			const { value } = await coll.findOneAndUpdate(filter, update, options)
			
			if (!value) throw createNotFoundError()
			
			if (value?.file?.id) {
				return value.file.id
			}
		},
		
		deleteDocument: async (collectionName, filterOrId) => {
			const coll = getCollection(collectionName)
			const filter = getFilter(filterOrId)
			const options = { projection: { file: { id: 1 } } }
			const { value } = await coll.findOneAndDelete(filter, options)
			
			if (value?.file?.id) {
				return value.file.id
			}
		},
	}
}

export default getDbService
