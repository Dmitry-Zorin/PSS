import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { MulterModule } from '@nestjs/platform-express'
import { Request } from 'express'
import { GridFsStorage } from 'multer-gridfs-storage'
import { FileModule } from '../../../file/file.module'
import { ResourcesController } from './resources.controller'

@Module({
	imports: [
		FileModule,
		ClientsModule.registerAsync([{
			name: 'RESOURCES_SERVICE',
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				transport: Transport.RMQ,
				options: {
					urls: [configService.get('RMQ_URL') as string],
					queue: configService.get('RESOURCES_QUEUE'),
				},
			}),
			inject: [ConfigService],
		}]),
		MulterModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				storage: new GridFsStorage({
					url: `${configService.get('MONGO_URI')}/${configService.get('MONGO_DB_NAME')}-files`,
					file: (req: Request, file: Express.Multer.File) => ({
						bucketName: req.params.resource,
						filename: file.originalname,
					}),
				}),
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [ResourcesController],
})
export class ResourcesModule {}
