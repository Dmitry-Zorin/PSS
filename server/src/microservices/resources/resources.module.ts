import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import Joi from 'joi'
import { CONNECTION_NAME } from './constants'
import * as entities from './entities'
import { OtherResourcesModule } from './other-resources/otherResources.module'
import { ResourceItemModule } from './resource-item/resourceItem.module'
import { ResourcesController } from './resources.controller'
import { ResourcesService } from './resources.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				RESOURCES_POSTGRES_URL: Joi.string().required(),
			}).unknown(),
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			name: CONNECTION_NAME,
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('RESOURCES_POSTGRES_URL'),
				entities: Object.values(entities),
				// synchronize: true,
				logging: true,
			}),
			inject: [ConfigService],
		}),
		ResourceItemModule,
		OtherResourcesModule,
	],
	controllers: [ResourcesController],
	providers: [ResourcesService],
})
export class ResourcesModule {}
