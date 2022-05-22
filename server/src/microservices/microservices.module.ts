import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import { FileModule } from './file/file.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				UI_SERVER: Joi.string().default(false),
				MICROSERVICES_PORT: Joi.number().default(4000),
				RMQ_URL: Joi.string().required(),
				AUTH_QUEUE: Joi.string().required(),
				RESOURCES_QUEUE: Joi.string().required(),
			}).unknown(),
		}),
		FileModule,
	],
})
export class MicroservicesModule {}
