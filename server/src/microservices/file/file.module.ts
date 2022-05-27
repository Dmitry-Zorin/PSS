import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import Joi from 'joi'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				MONGO_URL: Joi.string().required(),
			}).unknown(),
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get('MONGO_URL'),
			}),
			inject: [ConfigService],
		}),
		// MulterModule.registerAsync({
		// 	imports: [ConfigModule],
		// 	useFactory: (configService: ConfigService) => ({
		// 		storage: new GridFsStorage({
		// 			url: configService.get('MONGO_URL')!,
		// 			file: (req: Request, file: Express.Multer.File) => ({
		// 				bucketName: req.params.resource,
		// 				filename: file.originalname,
		// 			}),
		// 		}),
		// 	}),
		// 	inject: [ConfigService],
		// }),
	],
	providers: [FileService],
	controllers: [FileController],
})
export class FileModule {}
