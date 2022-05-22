import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_PIPE, RouterModule } from '@nestjs/core'
import Joi from 'joi'
import { ResourcesModule } from './controllers/resources/resources.module'
import { AllExceptionsFilter } from './exception.filter'
import { JwtGuard } from './jwt/jwt.guard'
import { JwtModule } from './jwt/jwt.module'
import { ParseQueryPipe } from './parse-query.pipe'
import { RolesGuard } from './roles.guard'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				UI_SERVER: Joi.string().default(false),
				API_GATEWAY_PORT: Joi.number().default(3000),
				SECRET: Joi.string().required(),
				RMQ_URL: Joi.string().required(),
				RESOURCES_QUEUE: Joi.string().required(),
			}).unknown(),
		}),
		JwtModule,
		RouterModule.register([
			{
				path: 'api',
				children: [
					{
						path: 'resources',
						module: ResourcesModule,
					},
				],
			},
		]),
		ResourcesModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		{
			provide: APP_PIPE,
			useClass: ParseQueryPipe,
		},
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class ApiGatewayAuthModule {}
