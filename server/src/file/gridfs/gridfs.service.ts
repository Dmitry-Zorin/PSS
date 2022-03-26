import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, mongo } from 'mongoose'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import { FileService } from '../file.service'

@Injectable()
export class GridFSService extends FileService {
	constructor(
		@InjectConnection()
		private readonly connection: Connection,
	) {
		super()
	}

	private getGridFSBucket(resource: string) {
		return new mongo.GridFSBucket(this.connection.db, { bucketName: resource })
	}

	async upload(resource: string, file: Express.Multer.File) {
		const bucket = this.getGridFSBucket(resource)
		const uploadSteam = bucket.openUploadStream(file.originalname)
		console.log(uploadSteam)
		await pipeline(Readable.from(file.buffer), uploadSteam as any).catch(err => {
			console.error(err)
			throw new BadRequestException('File failed to upload')
		})
		return { id: uploadSteam.id.toString() }
	}

	async download(resource: string, fileId: string) {
		if (!mongo.ObjectId.isValid(fileId)) {
			throw new BadRequestException('Invalid file ID')
		}
		const bucket = this.getGridFSBucket(resource)
		return bucket.openDownloadStream(new mongo.ObjectId(fileId))
	}

	async delete(resource: string, fileId: string) {
		if (!mongo.ObjectId.isValid(fileId)) return
		const bucket = this.getGridFSBucket(resource)
		return bucket.delete(new mongo.ObjectId(fileId)).catch((err: any) => {
			if (!err) return
			console.error(err)
		})
	}
}
