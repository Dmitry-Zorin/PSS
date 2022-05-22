import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { ResourcesModule } from './resources.module'

async function bootstrap() {
	const app = await NestFactory.createMicroservice(ResourcesModule, {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RMQ_URL],
			queue: process.env.RESOURCES_QUEUE,
		},
	})
	await app.listen()
}

bootstrap()
