import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import { IdParamDto, PasswordParamDto, SettingsDto, UsernameParamDto } from './dto'
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
	async register(
		@Payload() { username }: UsernameParamDto,
		@Payload() { password }: PasswordParamDto,
	) {
		const user = await this.authService.createUser(username, password)
		return { token: this.jwtService.sign(user) }
	}

	@MessagePattern('login')
	async login(
		@Payload() { username }: UsernameParamDto,
		@Payload() { password }: PasswordParamDto,
	) {
		const user = await this.authService.findUser({ username }, {
			passwordToVerify: password,
		})
		return { token: this.jwtService.sign(user) }
	}

	@MessagePattern('settings')
	updateSettings(
		@Payload() { id }: IdParamDto,
		@Payload('payload') settings: SettingsDto,
	) {
		return this.authService.updateSettings(id, settings)
	}

	@MessagePattern('identity')
	getIdentity({ id }: IdParamDto) {
		return this.authService.findUser({ id })
	}

	@MessagePattern('unregister')
	unregister({ id }: IdParamDto) {
		return this.authService.removeUser(id)
	}
}
