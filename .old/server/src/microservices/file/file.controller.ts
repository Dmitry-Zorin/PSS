import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	StreamableFile,
} from '@nestjs/common'
import { getType } from 'mime/lite'
import { FileService } from './file.service'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post(':id')
	// @UseInterceptors(FileInterceptor('file'))
	async addFile() {
		// @UploadedFile() file: Express.Multer.File, // @Param('id') id: string, // @Headers('origin') origin: string,
		// console.log(origin, id, file)
		// return
	}

	@Put(':id')
	// @UseInterceptors(FileInterceptor('file'))
	async replaceFile() {} // @UploadedFile() file: Express.Multer.File, // @Param('id') id: string,

	@Get('files/:resource/:fileId')
	async getFile(
		@Param('resource') resource: string,
		@Param('fileId') fileId: string,
	) {
		const { file, filename } = await this.fileService.download(resource, fileId)
		return new StreamableFile(file, {
			type: getType(filename)!,
			disposition: `attachment; filename=${filename}`,
		})
	}

	@Delete(':id')
	async deleteFile(@Param('id') id: string) {
		await this.fileService.delete('', id)
	}
}
