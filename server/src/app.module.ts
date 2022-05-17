import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import Joi from 'joi'
import { AuthModule } from './microservices/auth/auth.module'
import { GatewayModule } from './gateway/gateway.module'
import { ResourcesModule } from './microservices/resources/resources.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				PORT: Joi.number().default(3000),
				UI_SERVER: Joi.string().default(false),
				RMQ_URL: Joi.string().required(),
				AUTH_QUEUE: Joi.string().required(),
				RESOURCES_QUEUE: Joi.string().required(),
			}).unknown(),
		}),
		GatewayModule,
		AuthModule,
		ResourcesModule,
	],
})
export class AppModule {}
