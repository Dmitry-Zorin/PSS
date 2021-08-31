import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MongoService } from './mongo.service'
import { PipelinesService } from './pipelines.service'

const services = [PipelinesService, MongoService]

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: `${configService.get('MONGO_URI')}/${configService.get('MONGO_DB_NAME')}`,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}),
			inject: [ConfigService],
		}),
	],
	providers: services,
	exports: services,
})
export class MongoModule {}
