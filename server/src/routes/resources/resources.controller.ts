import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { DbService } from '../../db/db.service'

@Controller()
export class ResourcesController {
	constructor(private readonly db: DbService) {}

	@Post(':resource')
	@UseInterceptors(FileInterceptor('file'))
	async create(
		@Body() body: any,
		@Param('resource') resource: string,
		@UploadedFile() file: Express.Multer.File,
	) {}

	@Get()
	findAll() {}

	@Get(':id')
	findOne(@Param('id') id: string) {}

	@Put(':id')
	update(@Param('id') id: string) {}

	@Delete(':id')
	remove(@Param('id') id: string) {}
}
