import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { object, string } from 'joi'
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
	providers: [ResourcesService],
})
export class ResourcesModule {}
