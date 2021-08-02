type Document = Record<string, any>

export interface Projection {
	[key: string]: 0 | 1 | boolean | string | Projection
}

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

interface FileInfo {
	id: string,
	name: string,
	url: string
}

export type File = NodeJS.ReadableStream

export interface FileService {
	upload: (bucketName: string, file: File, filename: string) => Promise<null | FileInfo>,
	download: (bucketName: string, fileId: string) => File,
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
