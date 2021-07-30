import { Readable } from 'stream'

interface FileInfo {
	id: string,
	name: string,
	url: string
}

export interface File {
	originalname: string,
	buffer: Buffer
}

export interface FileService {
	upload: (collectionName: string, file?: File) => Promise<null | FileInfo>,
	download: (collectionName: string, fileId: string) => Readable,
	remove: (collectionName: string, fileId: string) => void
}
