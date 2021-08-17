import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app/app.module'
import { JwtGuard } from './jwt/jwt.guard'
import logger from './logger'

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule, {
		logger: [ 'error', 'warn' ],
	})

	app.use(helmet())
	app.useGlobalGuards(new JwtGuard(new Reflector()))

	const config = app.get<ConfigService>(ConfigService)

	app.enableCors({
		origin: config.get('UI_SERVER'),
		exposedHeaders: 'content-range',
		credentials: true,
	})

	await app.listen(config.get('PORT')!)
	logger.succeed('Server is running')
}

bootstrap()
