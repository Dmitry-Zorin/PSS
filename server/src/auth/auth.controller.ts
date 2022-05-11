import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import { UpdateSettingsDto } from './dto/update-identity.dto'
import { UserCredentialsDto } from './dto/user-credentials.dto'
import { HttpExceptionFilter } from './http-exception.filter'

@Controller()
@UsePipes(ValidationPipe)
@UseFilters(HttpExceptionFilter)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@MessagePattern('register')
	async handleRegister({ username, password }: UserCredentialsDto) {
		const hashedPassword = await this.authService.hashPassword(password)
		const user = { username, password: hashedPassword }
		const userRecord = await this.authService.createUser(user)
		return { token: this.authService.getToken(userRecord) }
	}

	@MessagePattern('login')
	async handleLogin({ username, password }: UserCredentialsDto) {
		const user = await this.authService.findUser(username)
		await this.authService.verifyPassword(password, user.password)
		return { token: this.authService.getToken(user) }
	}

	@MessagePattern('update_settings')
	async handleUpdateSettings({ username, payload }: UpdateSettingsDto) {
		await this.authService.updateSettings(username, payload)
		return null
	}

	@MessagePattern('find_identity')
	async handleFindIdentity(username: string) {
		const { password, ...identity } = await this.authService.findUser(username)
		return identity
	}

	@MessagePattern('unregister')
	async handleUnregister(username: string) {
		await this.authService.removeUser(username)
		return null
	}
}
