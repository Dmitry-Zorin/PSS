import { File } from '../services/types'

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
		file?: File,
	): Promise<any>
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

interface DeleteDocument {
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
