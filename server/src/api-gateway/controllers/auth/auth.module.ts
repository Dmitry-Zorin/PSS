import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AUTH_SERVICE } from '../../constants'
import { AuthController } from './auth.controller'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: AUTH_SERVICE,
				imports: [ConfigModule],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.TCP,
					options: {
						port: configService.get('TCP_PORT'),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [AuthController],
})
export class AuthModule {}
