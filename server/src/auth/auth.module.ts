import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { object, string } from 'joi'
import path from 'path'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { HttpExceptionFilter } from './http-exception.filter'
import { User } from './user.entity'

@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: object({
				SECRET: string().required(),
				POSTGRES_URL: string().required(),
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
	providers: [
		AuthService,
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AuthModule {}
