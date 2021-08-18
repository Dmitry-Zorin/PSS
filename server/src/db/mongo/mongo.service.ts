import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { isString } from 'lodash'
import { Db, Document, MongoClient, ObjectId } from 'mongodb'
import { WrongIdFormatException } from '../../errors'
import { DocumentFilter } from './mongo.types'
import { getPaginationPipeline, PaginationPipelineOptions } from './pipelines/pagination'
import { ProjectionsService } from './projections.service'

type FilterOrId = DocumentFilter | string
type GetDocumentResult = Promise<Document>
type UpdateDocumentResult = Promise<string | undefined>
type DeleteDocumentResult = Promise<string | undefined>

@Injectable()
export class MongoService {
	private readonly db: Db

	constructor(
		@Inject('MONGO_CLIENT')
		private readonly client: MongoClient,
		private readonly config: ConfigService,
		private readonly projections: ProjectionsService,
	) {
		this.db = client.db(config.get('DB_NAME'))
	}

	private static getObjectId(id: string) {
		if (!ObjectId.isValid(id)) {
			throw new WrongIdFormatException()
		}
		return new ObjectId(id)
	}

	private static getFilter(filterOrId: FilterOrId) {
		if (isString(filterOrId)) {
			return { _id: MongoService.getObjectId(filterOrId) }
		}
		const id = filterOrId._id
		return id ? { ...filterOrId, _id: MongoService.getObjectId(id) } : filterOrId
	}

	getCollections() {
		return this.db.collections()
	}

	getCollectionCount(collectionName: string) {
		return this.db
			.collection(collectionName)
			.estimatedDocumentCount()
	}

	async addDocument(collectionName: string, document: Document) {
		const payload = this.projections.getProjectedDocument(collectionName, document)

		const { insertedId } = await this.db
			.collection(collectionName)
			.insertOne(payload)
			.catch(err => {
				if (err.code !== 11000) throw err
				throw new ConflictException()
			})

		return { id: insertedId.toString() }
	}

	getDocuments(collectionName: string, options: PaginationPipelineOptions) {
		const pipeline = getPaginationPipeline(options)
		return this.db
			.collection(collectionName)
			.aggregate(pipeline)
			.toArray()
	}

	async getDocument(collectionName: string, filter: DocumentFilter): GetDocumentResult
	async getDocument(collectionName: string, documentId: string): GetDocumentResult
	async getDocument(collectionName: string, filterOrId: FilterOrId): GetDocumentResult {
		const projection = this.projections.getResourceProjection(collectionName)
		const filter = MongoService.getFilter(filterOrId)

		const document = await this.db
			.collection(collectionName)
			.findOne(filter, { projection })

		if (!document) {
			throw new NotFoundException()
		}
		return document
	}

	async updateDocument(collectionName: string, filter: DocumentFilter, document: Document): UpdateDocumentResult
	async updateDocument(collectionName: string, documentId: string, document: Document): UpdateDocumentResult
	async updateDocument(collectionName: string, filterOrId: FilterOrId, document: Document): UpdateDocumentResult {
		const payload = this.projections.getProjectedDocument(collectionName, document)
		const filter = MongoService.getFilter(filterOrId)
		const update = { $set: payload }
		const options = { projection: this.projections.fileIdProjection }

		const { value } = await this.db
			.collection(collectionName)
			.findOneAndUpdate(filter, update, options)

		if (!value) {
			throw new NotFoundException()
		}
		return value?.file.id?.toString()
	}

	async deleteDocument(collectionName: string, filter: DocumentFilter): DeleteDocumentResult
	async deleteDocument(collectionName: string, documentId: string): DeleteDocumentResult
	async deleteDocument(collectionName: string, filterOrId: FilterOrId): DeleteDocumentResult {
		const filter = MongoService.getFilter(filterOrId)
		const options = { projection: this.projections.fileIdProjection }

		const { value } = await this.db
			.collection(collectionName)
			.findOneAndDelete(filter, options)

		return value?.file.id?.toString()
	}
}
