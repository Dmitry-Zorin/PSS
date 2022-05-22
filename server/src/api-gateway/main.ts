import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { ApiGatewayModule } from './api-gateway.module'

async function bootstrap() {
	const app = await NestFactory.create(ApiGatewayModule)
	const config = app.get(ConfigService)

	app.enableCors({
		origin: config.get('UI_SERVER'),
		exposedHeaders: 'content-range',
		credentials: true,
	})

	app.use(helmet())

	await app.listen(config.get('API_GATEWAY_PORT')!)
}

bootstrap()
