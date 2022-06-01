import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RESOURCES_SERVICE } from 'api-gateway/constants'
import { ResourcesController } from './resources.controller'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: RESOURCES_SERVICE,
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
		// HttpModule,
	],
	controllers: [ResourcesController],
})
export class ResourcesModule {}
