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

export interface EncryptionService {
	hash: (string: string, salt?: number) => Promise<null | string>,
	compare: (string: string, hash: string) => Promise<boolean>
}

export interface TokenService {
	sign: (payload: Record<string, boolean | number | string>, expiresIn?: number | string) => string,
	verify: (token: string) => Record<string, boolean | number | string>
}
