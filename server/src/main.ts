import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { ConfigService } from '@nestjs/config'
import getApp from './app'

async function bootstrap() {
	const app = await getApp()
	const configService = app.get<ConfigService>(ConfigService)

	await app.register(fastifyCors, {
		origin: /^http:\/\/localhost/,
		exposedHeaders: 'content-range',
		credentials: true,
	})

	await app.register(fastifyHelmet)
	await app.listen(configService.get('PORT')!)
}

bootstrap()
