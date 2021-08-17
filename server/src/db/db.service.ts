import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { isEmpty, isString } from 'lodash'
import { Db, Document, MongoClient, ObjectId } from 'mongodb'
import { noPropsError, wrongIdFormatError } from '../errors'
import { Projection } from '../types'
import { projectNonNullishProps } from '../utils'

type Filter = Record<string, number | string>

const getObjectId = (id: string) => {
	if (!ObjectId.isValid(id)) {
		throw wrongIdFormatError
	}
	return new ObjectId(id)
}

const getFilter = (argument: string | Filter) => {
	if (isString(argument)) {
		return { _id: getObjectId(argument) }
	}
	const id = argument._id
	return id ? { ...argument, _id: getObjectId(id as string) } : argument
}

@Injectable()
export class DbService {
	private readonly db: Db

	constructor(
		private readonly config: ConfigService,
		@Inject('DB_CLIENT') private readonly client: MongoClient,
	) {
		this.db = client.db(config.get('DB_NAME'))
	}

	async getCollectionNames() {
		const collections = await this.db.collections()
		return collections.map(e => e.collectionName)
	}

	getDocumentCount(collectionName: string) {
		const collection = this.db.collection(collectionName)
		return collection.estimatedDocumentCount()
	}

	async addDocument(collectionName: string, document: Document, projection?: Projection) {
		const payload = !projection ? document
			: projectNonNullishProps(document, projection)

		if (!payload) {
			throw noPropsError
		}

		const coll = this.db.collection(collectionName)
		const { insertedId } = await coll.insertOne(payload)
		return { id: insertedId.toString() }
	}

	getDocuments(collectionName: string, pipeline: object[]) {
		const coll = this.db.collection(collectionName)
		return coll.aggregate(pipeline).toArray()
	}

	async getDocument(collectionName: string, filter: Filter, projection: Projection): Promise<Document>
	async getDocument(collectionName: string, documentId: string, projection: Projection): Promise<Document>
	async getDocument(collectionName: string, filterOrId: Filter | string, projection: Projection): Promise<Document> {
		const filter = getFilter(filterOrId)
		const coll = this.db.collection(collectionName)
		const doc = await coll.findOne(filter, { projection })
		if (!doc) {
			throw new NotFoundException()
		}
		return doc
	}

	async updateDocument(collectionName: string, filter: Filter, updateDocument: Document, projection?: Projection): Promise<string>
	async updateDocument(collectionName: string, documentId: string, updateDocument: Document, projection?: Projection): Promise<string>
	async updateDocument(collectionName: string, filterOrId: Filter | string, updateDocument: Document, projection?: Projection): Promise<string> {
		const payload = !projection ? updateDocument
			: projectNonNullishProps(updateDocument, projection)

		if (isEmpty(payload)) {
			throw noPropsError
		}

		const filter = getFilter(filterOrId)
		const update = { $set: payload }
		const options = { projection: { file: { id: 1 } } }
		const coll = this.db.collection(collectionName)
		const { value } = await coll.findOneAndUpdate(filter, update, options)

		if (!value) {
			throw new NotFoundException()
		}

		return value?.file.id.toString()
	}

	async deleteDocument(collectionName: string, filter: Filter): Promise<string>
	async deleteDocument(collectionName: string, documentId: string): Promise<string>
	async deleteDocument(collectionName: string, filterOrId: Filter | string): Promise<string> {
		const filter = getFilter(filterOrId)
		const options = { projection: { file: { id: 1 } } }
		const coll = this.db.collection(collectionName)
		const { value } = await coll.findOneAndDelete(filter, options)
		return value?.file.id.toString()
	}
}
