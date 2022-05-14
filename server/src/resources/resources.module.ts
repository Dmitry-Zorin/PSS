import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import Joi from 'joi'
import * as entities from './entities'
import { OtherResourcesModule } from './other-resources/otherResources.module'
import { ResourceItemModule } from './resource-item/resourceItem.module'
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
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			name: 'resourcesConnection',
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('POSTGRES_URL'),
				synchronize: true,
				logging: true,
				entities: Object.values(entities),
			}),
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([], 'resourcesConnection'),
		ResourceItemModule,
		OtherResourcesModule,
	],
	controllers: [ResourcesController],
	providers: [ResourcesService],
})
export class ResourcesModule {}
