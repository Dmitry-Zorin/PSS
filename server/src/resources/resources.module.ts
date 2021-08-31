import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { object, string } from 'joi'
import { HttpExceptionFilter } from '../auth/http-exception.filter'
import { DbModule } from './db/db.module'
import { ResourcesController } from './resources.controller'
import { ResourcesService } from './resources.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: object({
				MONGO_URI: string().required(),
				MONGO_DB_NAME: string().required(),
				POSTGRES_URL: string().required(),
				RMQ_URL: string().required(),
			}).unknown(),
		}),
		DbModule.forRoot({ db: 'postgres' }),
	],
	controllers: [ResourcesController],
	providers: [
		ResourcesService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class ResourcesModule {}
