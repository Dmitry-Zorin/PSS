import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { ConfigService } from '@nestjs/config'
import getApp from './get-app'

declare const module: any

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

	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}
}

bootstrap()
