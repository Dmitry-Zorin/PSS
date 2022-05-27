import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import Joi from 'joi'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CONNECTION_NAME } from './constants'
import * as entities from './entities'
import { Settings, User } from './entities'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				SECRET: Joi.string().required(),
				AUTH_POSTGRES_URL: Joi.string().required(),
			}).unknown(),
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			name: CONNECTION_NAME,
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('AUTH_POSTGRES_URL'),
				entities: Object.values(entities),
				// synchronize: true,
				logging: true,
			}),
			inject: [ConfigService],
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				secret: config.get('SECRET'),
				signOptions: {
					expiresIn: '7d',
				},
			}),
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([User, Settings], CONNECTION_NAME),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
