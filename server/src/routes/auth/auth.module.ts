import { Module } from '@nestjs/common'
import { DbModule } from '../../db/db.module'
import { JwtModule } from '../../jwt/jwt.module'
import { AuthController } from './auth.controller'

@Module({
	imports: [ DbModule, JwtModule ],
	controllers: [ AuthController ],
})
export class AuthModule {}
