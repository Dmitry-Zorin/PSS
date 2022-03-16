import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import { DbModule } from './db/db.module'
import { ResourcesController } from './resources.controller'
import { ResourcesService } from './resources.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				MONGO_URI: Joi.string().required(),
				MONGO_DB_NAME: Joi.string().required(),
				POSTGRES_URL: Joi.string().required(),
				RMQ_URL: Joi.string().required(),
			}).unknown(),
		}),
		DbModule.forRoot({ db: 'postgres' }),
	],
	controllers: [ResourcesController],
	providers: [ResourcesService],
})
export class ResourcesModule {}
