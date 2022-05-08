import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { firstValueFrom } from 'rxjs'
import { FileService } from '../../../file/file.service'
import { Public } from '../../jwt/jwt.guard'
import { Role, Roles } from '../../roles.guard'

@Controller()
export class ResourcesController {
	constructor(
		@Inject('RESOURCES_SERVICE')
		private readonly resourcesClient: ClientProxy,
		private readonly fileService: FileService,
	) {}

	@Get('count')
	getCount() {
		return this.resourcesClient.send('get_count', {})
	}

	@Get('categories')
	getCategories() {
		return this.resourcesClient.send('get_categories', {})
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
	@Roles(Role.Admin)
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() body: object,
		@Param('resource') resource: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		const payload: any = { ...body }

		if (file) {
			payload.fileInfo = {
				fileId: file.id,
				name: file.originalname,
			}
		}

		const data = { resource, payload }
		return this.resourcesClient.send('create', data)
	}

	@Get(':resource')
	async find(
		@Query() query: any,
		@Param('resource') resource: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const data = { resource, query }
		const findListObservable = this.resourcesClient.send('find', data)
		const { range, records } = await firstValueFrom(findListObservable)
		if (range) {
			res.header('Content-Range', range)
		}
		return records
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
	@Roles(Role.Admin)
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
				fileId: file.id,
				name: file.originalname,
			}
		}

		const data = { resource, id, payload }
		const updateObservable = this.resourcesClient.send('update', data)
		const fileId = await firstValueFrom(updateObservable)
		await this.fileService.delete(resource, fileId)
	}

	@Delete(':resource')
	@Roles(Role.Admin)
	async remove(
		@Param('resource') resource: string,
		@Query('ids') ids: string[],
	) {
		const data = { resource, ids }
		const removeObservable = this.resourcesClient.send('remove', data)
		const fileIds = await firstValueFrom(removeObservable)
		await this.fileService.deleteMany(resource, fileIds)
	}

	@Delete(':resource/:id')
	@Roles(Role.Admin)
	async removeOne(
		@Param('resource') resource: string,
		@Param('id') id: string,
	) {
		const data = { resource, id }
		const removeObservable = this.resourcesClient.send('remove-one', data)
		const fileId = await firstValueFrom(removeObservable)
		await this.fileService.delete(resource, fileId)
	}
}
