import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { isEmpty } from 'lodash'
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

	@Post(':resource')
	@Roles(Role.Admin)
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() body: object,
		@Param('resource') resource: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		if (isEmpty(body)) {
			throw new BadRequestException('Request body is missing')
		}

		return this.resourcesClient.send('create', {
			resource,
			payload: {
				...body,
				...file && {
					file: {
						fileId: file.id,
						name: file.originalname,
					},
				},
			},
		})
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
		if (isEmpty(body)) {
			throw new BadRequestException('Request body is missing')
		}

		const updateObservable = this.resourcesClient.send('update', {
			resource,
			id,
			payload: {
				...body,
				...file && {
					file: {
						fileId: file.id,
						name: file.originalname,
					},
				},
			},
		})

		const fileId = await firstValueFrom(updateObservable)

		if (fileId) {
			await this.fileService.delete(resource, fileId)
		}
	}

	@Get(':resource')
	async find(
		@Query() query: any,
		@Param('resource') resource: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const data = { resource, query }
		const findObservable = this.resourcesClient.send('find', data)
		const { range, records } = await firstValueFrom(findObservable)
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

	@Delete(':resource')
	@Roles(Role.Admin)
	async remove(
		@Param('resource') resource: string,
		@Query('ids') ids: string[],
	) {
		const data = { resource, ids }
		const removeObservable = this.resourcesClient.send('remove', data)
		const fileIds = await firstValueFrom(removeObservable)
		await this.fileService.deleteMany(resource, fileIds.filter((e: any) => e))
	}

	@Delete(':resource/:id')
	@Roles(Role.Admin)
	async removeOne(
		@Param('resource') resource: string,
		@Param('id') id: string,
	) {
		const data = { resource, id }
		const removeOneObservable = this.resourcesClient.send('remove_one', data)
		const fileId = await firstValueFrom(removeOneObservable)

		if (fileId) {
			await this.fileService.delete(resource, fileId)
		}
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

	@Get('count')
	getCount() {
		return this.resourcesClient.send('get_count', {})
	}

	@Get('categories')
	getCategories() {
		return this.resourcesClient.send('get_categories', {})
	}
}
