import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { FileModule } from './file.module'

async function bootstrap() {
	const app = await NestFactory.create(FileModule)
	const config = app.get(ConfigService)

	app.enableCors({ origin: config.get('API_SERVER') })
	app.use(helmet())

	await app.listen(config.get('FILE_MICROSERVICE_PORT')!)
}

bootstrap()
