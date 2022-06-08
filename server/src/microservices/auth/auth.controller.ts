import {
	Controller,
	UseFilters,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import { DEFAULT_SUCCESS_RESPONSE } from './constants'
import { CredentialsDto, SettingsDto } from './dto'
import { IdParamDto } from './dto/params'
import { HttpExceptionFilter } from './http-exception.filter'

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
@UseFilters(HttpExceptionFilter)
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
	) {}

	@MessagePattern('register')
	async register({ username, password }: CredentialsDto) {
		const user = await this.authService.createUser(username, password)
		return { token: this.jwtService.sign(user) }
	}

	@MessagePattern('login')
	async login({ username, password }: CredentialsDto) {
		const user = await this.authService.findUser(
			{ username },
			{ passwordToVerify: password },
		)
		return { token: this.jwtService.sign(user) }
	}

	@MessagePattern('settings')
	async updateSettings(
		@Payload() { id }: IdParamDto,
		@Payload('payload') settings: SettingsDto,
	) {
		await this.authService.updateSettings(id, settings)
		return DEFAULT_SUCCESS_RESPONSE
	}

	@MessagePattern('identity')
	getIdentity({ id }: IdParamDto) {
		return this.authService.findUser({ id })
	}

	@MessagePattern('unregister')
	async unregister({ id }: IdParamDto) {
		await this.authService.removeUser(id)
		return DEFAULT_SUCCESS_RESPONSE
	}
}
