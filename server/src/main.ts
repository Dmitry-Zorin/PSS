import fastifyHelmet from '@fastify/helmet'
import { ConfigService } from '@nestjs/config'
import getApp from './get-app'

async function bootstrap() {
	const app = await getApp()
	const configService = app.get(ConfigService)

	app.enableCors({
		origin: configService.get('UI_SERVER'),
		exposedHeaders: 'content-range',
		credentials: true,
	})

	await app.register(fastifyHelmet)
	await app.listen(configService.get('PORT')!)
}

bootstrap()
