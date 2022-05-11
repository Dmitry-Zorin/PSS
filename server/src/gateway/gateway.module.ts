import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_PIPE, RouterModule } from '@nestjs/core'
import Joi from 'joi'
import { AllExceptionsFilter } from './exception.filter'
import { JwtGuard } from './jwt/jwt.guard'
import { JwtModule } from './jwt/jwt.module'
import { ParseQueryPipe } from './parse-query.pipe'
import { RolesGuard } from './roles.guard'
import getRouteModules from './routes/get-route-modules'
import routes from './routes/routes'

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
		...getRouteModules(routes),
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
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
		{
			provide: APP_PIPE,
			useClass: ParseQueryPipe,
		}
	],
})
export class GatewayModule {}
