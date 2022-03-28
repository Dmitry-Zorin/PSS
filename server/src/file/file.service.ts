import { Readable } from 'stream'

export abstract class FileService {
	abstract download(resource: string, fileId: string): Promise<Readable>
	abstract delete(resource: string, fileId: string): Promise<void>
}
