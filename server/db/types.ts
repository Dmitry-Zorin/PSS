import { Projection } from './projections/types'
import { GridFSBucketReadStream } from 'mongodb'

interface FileInfo {
	id: string,
	name: string,
	url: string
}

export interface FileService {
	addFile: (collectionName: string, file?: Express.Multer.File) => Promise<null | FileInfo>,
	getFile: (collectionName: string, fileId: string) => GridFSBucketReadStream,
	deleteFile: (collectionName: string, fileId: string) => void
}

export type Document = Record<string, any>

export type Filter = Record<string, number | string>

export interface AddDocument {
	(
		collectionName: string,
		document: Document,
		projection?: Projection,
		file?: Express.Multer.File,
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
		file?: Express.Multer.File,
	): Promise<void>,
	(
		collectionName: string,
		documentId: string,
		updateDocument: Document,
		projection?: Projection,
		file?: Express.Multer.File,
	): Promise<void>,
}

export interface DeleteDocument {
	(collectionName: string, filter: Filter): Promise<void>,
	(collectionName: string, documentId: string): Promise<void>,
}

export interface DbService {
	fileService: FileService,
	getCollectionNames: () => Promise<string[]>,
	getDocumentCount: (collectionName: string) => Promise<number>,
	addDocument: AddDocument,
	getDocuments: GetDocuments,
	getDocument: GetDocument,
	updateDocument: UpdateDocument,
	deleteDocument: DeleteDocument,
}
