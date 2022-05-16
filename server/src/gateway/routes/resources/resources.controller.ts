import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { isEmpty } from 'lodash'
import { map } from 'rxjs'
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
		return this.resourcesClient.send('count', {})
	}

	@Get('categories')
	getCategories() {
		return this.resourcesClient.send('categories', {})
	}

	@Get('authors/:id/publications')
	getAuthorPublications(@Param('id') id: string) {
		return this.resourcesClient.send('author_publications', { id })
	}

	@Post(':resource')
	@Roles(Role.Admin)
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() body: any,
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
		@Body() body: any,
		@Param('resource') resource: string,
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		if (isEmpty(body)) {
			throw new BadRequestException('Request body is missing')
		}

		return this.resourcesClient
			.send('update', {
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
			.pipe(map(async () => {
				await this.fileService.delete(resource, '')
			}))
	}

	@Get(':resource')
	async find(
		@Query() query: any,
		@Param('resource') resource: string,
		@Res({ passthrough: true }) res: Response,
	) {
		return this.resourcesClient
			.send('find', { resource, query })
			.pipe(map(({ range, records }) => {
				if (range) {
					res.header('Content-Range', range)
				}
				return records
			}))
	}

	@Get(':resource/:id')
	findOne(
		@Param('resource') resource: string,
		@Param('id') id: string,
	) {
		return this.resourcesClient.send('find_one', { resource, id })
	}

	@Delete(':resource')
	@Roles(Role.Admin)
	async remove(
		@Param('resource') resource: string,
		@Query('ids') ids: string[],
	) {
		return this.resourcesClient
			.send('remove', { resource, ids })
			.pipe(map(async () => {
				await this.fileService.delete(resource, '')
			}))
	}

	@Delete(':resource/:id')
	@Roles(Role.Admin)
	removeOne(
		@Param('resource') resource: string,
		@Param('id') id: string,
	) {
		return this.resourcesClient
			.send('remove_one', { resource, id })
			.pipe(map(async () => {
				await this.fileService.delete(resource, '')
			}))
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
}
