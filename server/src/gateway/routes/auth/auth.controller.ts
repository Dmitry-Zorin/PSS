import { Body, Controller, Delete, Get, HttpCode, Inject, Post, Put } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Public } from '../../jwt/jwt.guard'
import { User } from './user.decorator'

interface UserType {
	id: string
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
	register(
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return this.authClient.send('register', { username, password })
	}

	@Public()
	@Post('login')
	@HttpCode(200)
	login(
		@Body('username') username: string,
		@Body('password') password: string,
	) {
		return this.authClient.send('login', { username, password })
	}

	@Post()
	@HttpCode(204)
	checkAuth() {}

	@Put('settings')
	async updateSettings(
		@User() { id }: UserType,
		@Body() body: Record<string, unknown>,
	) {
		const data = { id, payload: body }
		return this.authClient.send('settings', data)
	}

	@Get('permissions')
	getPermissions(@User() user: UserType) {
		return { role: user.role }
	}

	@Get('identity')
	findIdentity(@User() { id }: UserType) {
		return this.authClient.send('identity', { id })
	}

	@Delete('unregister')
	unregister(@User() { id }: UserType) {
		return this.authClient.send('unregister', { id })
	}
}
