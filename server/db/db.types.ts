import { File } from '../services/file/file.types'

export type Document = Record<string, any>

export interface Projection {
	[key: string]: 0 | 1 | boolean | string | Projection
}

export type Filter = Record<string, number | string>

export interface AddDocument {
	(
		collectionName: string,
		document: Document,
		projection?: Projection,
		file?: File,
	): Promise<any>
}

export interface GetDocuments {
	(collectionName: string, pipeline: object[]): Promise<any[]>
}

export interface GetDocument {
	(collectionName: string, filter: Filter, projection: Projection): Promise<any>,
	(collectionName: string, documentId: string, projection: Projection): Promise<any>,
}

export interface UpdateDocument {
	(
		collectionName: string,
		filter: Filter,
		updateDocument: Document,
		projection?: Projection,
		file?: File,
	): Promise<void>,
	(
		collectionName: string,
		documentId: string,
		updateDocument: Document,
		projection?: Projection,
		file?: File,
	): Promise<void>,
}

export interface DeleteDocument {
	(collectionName: string, filter: Filter): Promise<void>,
	(collectionName: string, documentId: string): Promise<void>,
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
