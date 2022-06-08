import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import Joi from 'joi'
import { CONNECTION_NAME } from './constants'
import * as entities from './entities'
import { OtherResourcesModule } from './other-resources/other-resources.module'
import { ResourceItemModule } from './resource-item/resource-item.module'
import { ResourcesController } from './resources.controller'
import { ResourcesService } from './resources.service'

export const baseTypeOrmOptions = {
	type: 'postgres' as const,
	entities: Object.values(entities),
}

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
			useFactory: (configService: ConfigService) => {
				const isProd = configService.get('NODE_ENV') === 'production'
				return {
					...baseTypeOrmOptions,
					url: configService.get('RESOURCES_POSTGRES_URL'),
					keepConnectionAlive: !isProd,
					logging: !isProd,
					cache: isProd,
				}
			},
			inject: [ConfigService],
		}),
		ResourceItemModule,
		OtherResourcesModule,
	],
	controllers: [ResourcesController],
	providers: [ResourcesService],
})
export class ResourcesModule {}
