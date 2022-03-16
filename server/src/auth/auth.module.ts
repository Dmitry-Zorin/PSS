import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import Joi from 'joi'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { User } from './user.entity'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				SECRET: Joi.string().required(),
				POSTGRES_URL: Joi.string().required(),
			}).unknown(),
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				url: configService.get('POSTGRES_URL'),
				entities: [User],
				synchronize: true,
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
		TypeOrmModule.forFeature([User]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
