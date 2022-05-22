import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AUTH_SERVICE } from 'src/api-gateway/constants'
import { AuthController } from './auth.controller'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: AUTH_SERVICE,
				imports: [ConfigModule],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [configService.get('RMQ_URL') as string],
						queue: configService.get('AUTH_QUEUE'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [AuthController],
})
export class AuthModule {}
