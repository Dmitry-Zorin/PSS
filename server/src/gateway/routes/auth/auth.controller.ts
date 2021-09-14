import { Body, Controller, Delete, Get, HttpCode, Inject, Post, Put } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { User } from '../../decorators'
import { Public } from '../../jwt/jwt.guard'

interface UserToken {
	username: string
	role: string
}

@Controller()
export class AuthController {
	constructor(
		@Inject('AUTH_SERVICE')
		private readonly authClient: ClientProxy,
	) {}

	@Public()
	@Post('register')
	register(@Body() body: unknown) {
		return this.authClient.send('register', body)
	}

	@Public()
	@Post('login')
	@HttpCode(200)
	login(@Body() body: unknown) {
		return this.authClient.send('login', body)
	}

	@Post()
	@HttpCode(204)
	checkAuth() {}

	@Get('permissions')
	getPermissions(@User() user: UserToken) {
		return { role: user.role }
	}

	@Get('identity')
	findIdentity(@User() { username }: UserToken) {
		return this.authClient.send('find_identity', username)
	}

	@Put('settings')
	async updateSettings(
		@User() { username }: UserToken,
		@Body() body: unknown,
	) {
		const data = { username, payload: body }
		return this.authClient.send('update_settings', data)
	}

	@Delete('unregister')
	unregister(@User() user: UserToken) {
		return this.authClient.send('unregister', user.username)
	}
}
