import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core'
import { object, string } from 'joi'
import { AllExceptionsFilter } from './exception.filter'
import { JwtGuard } from './jwt/jwt.guard'
import { JwtModule } from './jwt/jwt.module'
import { routeModules, routes } from './routes/routes'

@Module({
	imports: [
		JwtModule,
		ConfigModule.forRoot({
			validationSchema: object({
				SECRET: string().required(),
				RMQ_URL: string().required(),
				AUTH_QUEUE: string().required(),
				RESOURCES_QUEUE: string().required(),
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
