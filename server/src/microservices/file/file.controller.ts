import {
	Controller,
	Delete,
	Get,
	Headers,
	Param,
	Post,
	Put,
	Res,
	StreamableFile,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post(':id')
	@UseInterceptors(FileInterceptor('file'))
	async addFile() // @Headers('origin') origin: string,
	// @Param('id') id: string,
	// @UploadedFile() file: Express.Multer.File,
	{
		// console.log(origin, id, file)
		// return
	}

	@Put(':id')
	@UseInterceptors(FileInterceptor('file'))
	async replaceFile() // @Param('id') id: string,
	// @UploadedFile() file: Express.Multer.File,
	{}

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

	@Delete(':id')
	async deleteFile(@Param('id') id: string) {
		await this.fileService.delete('', id)
	}
}
