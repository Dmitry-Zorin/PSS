import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { FileService } from './file.service'

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: `${configService.get('MONGO_URI')}/${configService.get('MONGO_DB_NAME')}-files`,
			}),
			inject: [ConfigService],
		}),
	],
	providers: [FileService],
	exports: [FileService],
})
export class FileModule {}
