import { Readable } from 'stream'

interface DownloadResult {
	file: Readable,
	filename: string
}

export abstract class FileService {
	abstract download(resource: string, fileId: string): Promise<DownloadResult>
	abstract delete(resource: string, fileId: string): Promise<void>
}
