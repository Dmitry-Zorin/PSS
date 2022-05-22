import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { AuthModule } from './auth.module'

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AuthModule, {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RMQ_URL],
			queue: process.env.AUTH_QUEUE,
		},
	})
	await app.listen()
}

bootstrap()
