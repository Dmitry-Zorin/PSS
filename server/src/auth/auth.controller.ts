import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import { HttpExceptionFilter } from './http-exception.filter'
import { UserCredentialsDto } from './user-credentials.dto'

@Controller()
@UsePipes(new ValidationPipe())
@UseFilters(new HttpExceptionFilter())
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

	@MessagePattern('unregister')
	async handleUnregister(username: string) {
		await this.authService.removeUser(username)
		return null
	}
}
