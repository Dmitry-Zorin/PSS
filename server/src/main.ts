import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import helmet from 'helmet'
import { AppModule } from './app.module'

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule)
	const config = app.get(ConfigService)

	app.enableCors({
		origin: config.get('UI_SERVER'),
		exposedHeaders: 'content-range',
		credentials: true,
	})

	app.use(helmet())

	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [config.get('RMQ_URL')],
			queue: config.get('AUTH_QUEUE'),
		},
	})

	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [config.get('RMQ_URL')],
			queue: config.get('RESOURCES_QUEUE'),
		},
	})

	await app.startAllMicroservices()
	await app.listen(config.get('PORT')!)

	process.env.SERVER = await app.getUrl()
}

bootstrap()
