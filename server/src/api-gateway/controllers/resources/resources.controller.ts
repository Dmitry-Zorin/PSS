import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	Query,
	Res,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { FastifyReply } from 'fastify'
import FormData from 'form-data'
import { isEmpty } from 'lodash'
import { firstValueFrom } from 'rxjs'
import { RESOURCES_SERVICE } from '../../constants'
import { Role, Roles } from '../../roles.guard'

@Controller()
export class ResourcesController {
	constructor(
		@Inject(RESOURCES_SERVICE)
		private readonly client: ClientProxy, // private readonly httpService: HttpService,
	) {}

	@Get('count')
	getCount() {
		return this.client.send('count', {})
	}

	@Get('categories')
	getCategories() {
		return this.client.send('categories', {})
	}

	@Get('publications')
	getAuthorPublications(@Query() query: Record<string, unknown>) {
		return this.client.send('publications', { query })
	}

	@Post(':resource')
	@Roles(Role.Admin)
	// @UseInterceptors(FileInterceptor('file'))
	async create(
		@Param('resource') resource: string,
		@Body() body: Record<string, unknown>,
		// @UploadedFile() file: Express.Multer.File,
	) {
		if (isEmpty(body)) {
			throw new BadRequestException('Request body is missing')
		}

		const result = await firstValueFrom(
			this.client.send('create', { resource, payload: body }),
		)

		const data = new FormData()
		// data.append('file', file.buffer, file.originalname)

		// await firstValueFrom(
		// 	this.httpService.post(`${MICROSERVICES_URL}/files/resources/${id}`, data),
		// )

		return result
	}

	@Put(':resource/:id')
	@Roles(Role.Admin)
	// @UseInterceptors(FileInterceptor('file'))
	async update(
		@Param('resource') resource: string,
		@Param('id') id: string,
		@Body() body: Record<string, unknown>,
		// @UploadedFile() file: Express.Multer.File,
	) {
		if (isEmpty(body)) {
			throw new BadRequestException('Request body is missing')
		}

		const result = await firstValueFrom(
			this.client.send('update', { resource, id, payload: body }),
		)

		const data = new FormData()
		// data.append('file', file.buffer, file.originalname)

		return result
	}

	@Get(':resource')
	async find(
		@Param('resource') resource: string,
		@Query() query: Record<string, unknown>,
		@Res({ passthrough: true }) res: FastifyReply,
	) {
		const { range, records } = await firstValueFrom(
			this.client.send('find', { resource, query }),
		)
		if (range) {
			res.header('Content-Range', range)
		}
		return records
	}

	@Get(':resource/:id')
	findOne(@Param('resource') resource: string, @Param('id') id: string) {
		return this.client.send('find_one', { resource, id })
	}

	@Delete(':resource')
	@Roles(Role.Admin)
	async remove(
		@Param('resource') resource: string,
		@Query('ids') ids: string[],
	) {
		return this.client.send('remove', { resource, ids })
	}

	@Delete(':resource/:id')
	@Roles(Role.Admin)
	removeOne(@Param('resource') resource: string, @Param('id') id: string) {
		return this.client.send('remove_one', { resource, id })
	}
}
