import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { firstValueFrom } from 'rxjs'

@Controller()
export class ResourcesController {
	constructor(
		@Inject('RESOURCES_SERVICE')
		private readonly resourcesClient: ClientProxy,
	) {}

	@Get('count')
	countAll() {
		return this.resourcesClient.send('count_all', {})
	}

	@Post(':resource')
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() body: object,
		@Param('resource') resource: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		const data = { resource, payload: { ...body, file } }
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
	update(
		@Body() body: object,
		@Param('resource') resource: string,
		@Param('id') id: string,
		@UploadedFile() file: Express.Multer.File,
	) {
		const data = { resource, id, payload: { ...body, file } }
		return this.resourcesClient.send('update', data)
	}

	@Delete(':resource/:id')
	remove(
		@Param('resource') resource: string,
		@Param('id') id: string,
	) {
		const data = { resource, id }
		return this.resourcesClient.send('remove', data)
	}
}
