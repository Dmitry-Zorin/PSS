import { Global, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Global()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('SECRET'),
		})
	}

	validate(payload: any) {
		return payload
	}
}
