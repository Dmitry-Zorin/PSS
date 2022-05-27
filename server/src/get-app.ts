import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

export default async function getApp() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	)
	const configService = app.get<ConfigService>(ConfigService)

	app.connectMicroservice({
		transport: Transport.TCP,
		options: {
			port: configService.get('TCP_PORT'),
		},
	})

	return app.startAllMicroservices()
}
