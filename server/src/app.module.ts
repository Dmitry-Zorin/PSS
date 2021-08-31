import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { number, object, string } from 'joi'
import { AuthModule } from './auth/auth.module'
import { GatewayModule } from './gateway/gateway.module'
import { ResourcesModule } from './resources/resources.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: object({
				PORT: number().default(3000),
				UI_SERVER: string().default(false),
				RMQ_URL: string().required(),
				AUTH_QUEUE: string().required(),
				RESOURCES_QUEUE: string().required(),
			}).unknown(),
		}),
		GatewayModule,
		AuthModule,
		ResourcesModule
	],
})
export class AppModule {}
