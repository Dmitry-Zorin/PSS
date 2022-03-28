import { Injectable } from '@nestjs/common'
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
			bucketName: resource
		})
	}

	async download(resource: string, fileId: string) {
		const objectId = new mongo.ObjectId(fileId)
		const bucket = this.getGridFSBucket(resource)
		return bucket.openDownloadStream(objectId)
	}

	async delete(resource: string, fileId: string) {
		const objectId = new mongo.ObjectId(fileId)
		const bucket = this.getGridFSBucket(resource)
		return bucket.delete(objectId).catch((err: any) => {
			if (!err) return
			console.error(err)
		})
	}
}
