import { isEmpty, isString } from 'lodash'
import { ObjectId } from 'mongodb'
import { createNotFoundError, noPropsError, wrongIdFormatError } from '../helpers/errors'
import { projectNonNullishProps } from '../helpers/utils'
import getClient from './mongo-client'
import { DbService, Filter } from './types'

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
	
	await db.collection('users').createIndex(
		{ username: 1 },
		{ unique: true },
	)
	
	return {
		getCollectionNames: async () => {
			const collections = await db.collections()
			return collections.map(e => e.collectionName)
		},
		
		getDocumentCount: (collectionName) => (
			db.collection(collectionName).estimatedDocumentCount()
		),
		
		addDocument: async (collectionName, document, projection) => {
			const payload = !projection ? document
				: projectNonNullishProps(document, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const coll = db.collection(collectionName)
			const { insertedId } = await coll.insertOne(payload)
			return { id: insertedId.toString() }
		},
		
		getDocuments: (collectionName, pipeline) => {
			const coll = db.collection(collectionName)
			return coll.aggregate(pipeline).toArray()
		},
		
		getDocument: async (collectionName, filterOrId, projection) => {
			const filter = getFilter(filterOrId)
			const coll = db.collection(collectionName)
			const doc = await coll.findOne(filter, { projection })
			
			if (!doc) throw createNotFoundError()
			return doc
		},
		
		updateDocument: async (
			collectionName,
			filterOrId,
			updateDocument,
			projection,
		) => {
			const payload = !projection ? updateDocument
				: projectNonNullishProps(updateDocument, projection)
			
			if (isEmpty(payload)) throw noPropsError
			
			const filter = getFilter(filterOrId)
			const update = { $set: payload }
			const options = { projection: { file: { id: 1 } } }
			const coll = db.collection(collectionName)
			const { value } = await coll.findOneAndUpdate(filter, update, options)
			
			if (!value) throw createNotFoundError()
			
			if (value?.file?.id) {
				return value.file.id
			}
		},
		
		deleteDocument: async (collectionName, filterOrId) => {
			const filter = getFilter(filterOrId)
			const options = { projection: { file: { id: 1 } } }
			const coll = db.collection(collectionName)
			const { value } = await coll.findOneAndDelete(filter, options)
			
			if (value?.file?.id) {
				return value.file.id
			}
		},
	}
}

export default getDbService
