import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, mongo } from 'mongoose'
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
		return new mongo.GridFSBucket(this.connection.db, {
			bucketName: resource,
		})
	}

	async download(resource: string, fileId: string) {
		if (!mongo.ObjectId.isValid(fileId)) {
			throw new BadRequestException('Invalid file ID')
		}
		const objectId = new mongo.ObjectId(fileId)
		const bucket = this.getGridFSBucket(resource)
		const files = await bucket.find({ _id: objectId }).toArray()
		if (!files.length) {
			throw new NotFoundException('File not found')
		}
		return {
			file: bucket.openDownloadStream(objectId),
			filename: files[0].filename,
		}
	}

	async delete(resource: string, fileId: string) {
		if (!mongo.ObjectId.isValid(fileId)) return
		const objectId = new mongo.ObjectId(fileId)
		const bucket = this.getGridFSBucket(resource)
		return bucket.delete(objectId).catch((err: any) => {
			if (!err) return
			console.error(err)
		})
	}
}
