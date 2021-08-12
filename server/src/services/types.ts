import { Document, GridFSFile, Projection as ProjectionOf } from 'mongodb'

export type Projection = ProjectionOf<Document>

export type Filter = Record<string, number | string>

interface AddDocument {
	(
		collectionName: string,
		document: Document,
		projection?: Projection,
	): Promise<{ id: string }>
}

interface GetDocuments {
	(collectionName: string, pipeline: object[]): Promise<any[]>
}

interface GetDocument {
	(collectionName: string, filter: Filter, projection: Projection): Promise<any>,
	(collectionName: string, documentId: string, projection: Projection): Promise<any>,
}

interface UpdateDocument {
	(
		collectionName: string,
		filter: Filter,
		updateDocument: Document,
		projection?: Projection,
	): Promise<void | string>,
	(
		collectionName: string,
		documentId: string,
		updateDocument: Document,
		projection?: Projection,
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

interface UploadFileResult {
	id: string,
	stream: NodeJS.WritableStream
}

interface DownloadFileResult {
	file: GridFSFile,
	stream: NodeJS.ReadWriteStream
}

export interface FsService {
	upload: (bucketName: string, file: NodeJS.ReadableStream, filename: string) => UploadFileResult,
	download: (bucketName: string, fileId: string) => Promise<DownloadFileResult>,
	delete: (bucketName: string, fileId: string) => Promise<void>
}

export interface CryptService {
	hash: (string: string, salt?: number) => Promise<null | string>,
	compare: (string: string, hash: string) => Promise<boolean>
}

export interface JwtService {
	sign: (payload: Record<string, any>, expiresIn?: number | string) => string,
	verify: (token: string) => Record<string, any>
}
