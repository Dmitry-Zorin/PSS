import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, APP_PIPE, RouterModule } from '@nestjs/core'
import Joi from 'joi'
import { AllExceptionsFilter } from './exception.filter'
import { AuthModule } from './controllers/auth/auth.module'
import { ResourcesModule } from './controllers/resources/resources.module'
import { JwtGuard } from './jwt/jwt.guard'
import { JwtModule } from './jwt/jwt.module'
import { ParseQueryPipe } from './parse-query.pipe'
import { RolesGuard } from './roles.guard'
import routes from './routes'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				UI_SERVER: Joi.string().default(false),
				PORT: Joi.number().default(3000),
				TCP_PORT: Joi.number().default(3001),
				SECRET: Joi.string().required(),
			}).unknown(),
		}),
		JwtModule,
		RouterModule.register(routes),
		AuthModule,
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
export class ApiGatewayModule {}
