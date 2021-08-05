import { Document, GridFSBucketReadStream, GridFSBucketWriteStream, Projection } from 'mongodb'

export type Filter = Record<string, number | string>

interface AddDocument {
	(
		collectionName: string,
		document: Document,
		projection?: Projection<Document>,
	): Promise<{ id: string }>
}

interface GetDocuments {
	(collectionName: string, pipeline: object[]): Promise<any[]>
}

interface GetDocument {
	(collectionName: string, filter: Filter, projection: Projection<Document>): Promise<any>,
	(collectionName: string, documentId: string, projection: Projection<Document>): Promise<any>,
}

interface UpdateDocument {
	(
		collectionName: string,
		filter: Filter,
		updateDocument: Document,
		projection?: Projection<Document>,
	): Promise<void | string>,
	(
		collectionName: string,
		documentId: string,
		updateDocument: Document,
		projection?: Projection<Document>,
	): Promise<void | string>,
}

interface DeleteDocument {
	(collectionName: string, filter: Filter): Promise<void | string>,
	(collectionName: string, documentId: string): Promise<void | string>,
}

export interface DbService {
	getCollectionNames: () => Promise<string[]>,
	getDocumentCount: (collectionName: string) => Promise<number>,
	addDocument: AddDocument,
	getDocuments: GetDocuments,
	getDocument: GetDocument,
	updateDocument: UpdateDocument,
	deleteDocument: DeleteDocument,
}

export interface FileService {
	getFileInfo: (
		bucketName: string,
		fileId: string,
		projection: Projection<Document>,
	) => Promise<any>
	upload: (
		bucketName: string,
		file: NodeJS.ReadableStream,
		filename: string,
	) => GridFSBucketWriteStream,
	download: (bucketName: string, fileId: string) => GridFSBucketReadStream,
	remove: (bucketName: string, fileId: string) => Promise<void>
}

export interface EncryptionService {
	hash: (string: string, salt?: number) => Promise<null | string>,
	compare: (string: string, hash: string) => Promise<boolean>
}

export interface TokenService {
	sign: (payload: Record<string, boolean | number | string>, expiresIn?: number | string) => string,
	verify: (token: string) => Record<string, boolean | number | string>
}
