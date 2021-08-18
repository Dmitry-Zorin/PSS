import { Module } from '@nestjs/common'
import { DbModule } from '../../db/db.module'
import { JwtModule } from '../../jwt/jwt.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [ DbModule, JwtModule ],
	controllers: [ AuthController ],
	providers: [ AuthService ],
})
export class AuthModule {}
