import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { firstValueFrom } from 'rxjs'
import { FileService } from '../../../file/file.service'
import { Public } from '../../jwt/jwt.guard'

@Controller()
export class ResourcesController {
	constructor(
		@Inject('RESOURCES_SERVICE')
		private readonly resourcesClient: ClientProxy,
		private readonly fileService: FileService,
	) {}

	@Get('count')
	countAll() {
		return this.resourcesClient.send('count_all', {})
	}

	@Public()
	@Get('files/:resource/:fileId')
	async getFile(
		@Param('resource') resource: string,
		@Param('fileId') fileId: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const { file, filename } = await this.fileService.download(resource, fileId)
		res.attachment(filename)
		return new StreamableFile(file)
	}

	@Post(':resource')
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() body: object,
		@Param('resource') resource: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		const payload: any = { ...body }

		if (file) {
			payload.fileInfo = {
				id: file.id,
				name: file.originalname,
			}
		}

		const data = { resource, payload }
		return this.resourcesClient.send('create', data)
	}

	@Get(':resource')
	async findAll(
		@Query() query: unknown,
		@Param('resource') resource: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const data = { resource, query }
		const findAllObservable = this.resourcesClient.send('find_all', data)
		const { range, documents } = await firstValueFrom(findAllObservable)
		res.header('Content-Range', range)
		return documents
	}

	@Get(':resource/:id')
	findOne(
		@Param('resource') resource: string,
		@Param('id') id: string,
	) {
		const data = { resource, id }
		return this.resourcesClient.send('find_one', data)
	}

	@Put(':resource/:id')
	@UseInterceptors(FileInterceptor('file'))
	async update(
		@Body() body: object,
		@Param('resource') resource: string,
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		const payload: any = { ...body }

		if (file) {
			payload.fileInfo = {
				id: file.id,
				name: file.originalname,
			}
		}

		const data = { resource, id, payload }
		const updateObservable = this.resourcesClient.send('update', data)
		const fileId = await firstValueFrom(updateObservable)
		await this.fileService.delete(resource, fileId)
	}

	@Delete(':resource/:id')
	async remove(
		@Param('resource') resource: string,
		@Param('id') id: string,
	) {
		const data = { resource, id }
		const removeObservable = this.resourcesClient.send('remove', data)
		const fileId = await firstValueFrom(removeObservable)
		await this.fileService.delete(resource, fileId)
	}
}
