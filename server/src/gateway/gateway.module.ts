import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core'
import Joi from 'joi'
import { AllExceptionsFilter } from './exception.filter'
import { JwtGuard } from './jwt/jwt.guard'
import { JwtModule } from './jwt/jwt.module'
import { routeModules, routes } from './routes/routes'

@Module({
	imports: [
		JwtModule,
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				SECRET: Joi.string().required(),
				RMQ_URL: Joi.string().required(),
				AUTH_QUEUE: Joi.string().required(),
				RESOURCES_QUEUE: Joi.string().required(),
			}).unknown(),
		}),
		RouterModule.register(routes),
		...routeModules,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtGuard,
		},
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class GatewayModule {}
