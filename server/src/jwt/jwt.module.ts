import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule as NestJwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

const AsyncJwtModule = NestJwtModule.registerAsync({
	imports: [ ConfigModule ],
	useFactory: (config: ConfigService) => ({
		secret: config.get('SECRET'),
		signOptions: {
			expiresIn: '30d',
		},
	}),
	inject: [ ConfigService ],
})

@Module({
	imports: [ ConfigModule, AsyncJwtModule ],
	providers: [ JwtStrategy ],
	exports: [ AsyncJwtModule ],
})
export class JwtModule {}
