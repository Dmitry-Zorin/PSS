import { Readable } from 'stream'

interface UploadResult {
	id: string,
}

export abstract class FileService {
	abstract upload(resource: string, file: Express.Multer.File): Promise<UploadResult>

	abstract download(resource: string, fileId: string): Promise<Readable>

	abstract delete(resource: string, fileId: string): Promise<void>
}
