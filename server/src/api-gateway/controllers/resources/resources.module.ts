import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RESOURCES_SERVICE } from 'src/api-gateway/constants'
import { ResourcesController } from './resources.controller'

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: RESOURCES_SERVICE,
				imports: [ConfigModule],
				useFactory: (configService: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [configService.get('RMQ_URL') as string],
						queue: configService.get('RESOURCES_QUEUE'),
					},
				}),
				inject: [ConfigService],
			},
		]),
		HttpModule,
	],
	controllers: [ResourcesController],
})
export class ResourcesModule {}
