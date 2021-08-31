import { Body, Controller, Delete, Get, HttpCode, Inject, Post } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { User } from '../../decorators'
import { Public } from '../../jwt/jwt.guard'
import { Role } from '../../types'

interface UserToken {
	username: string
	role: Role
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

	@Public()
	@Delete('unregister')
	unregister(@User() user: UserToken) {
		return this.authClient.send('unregister', user?.username || 'username')
	}

	@Post()
	@HttpCode(204)
	checkAuth() {}

	@Get('permissions')
	getPermissions(@User() user: UserToken) {
		return { role: user.role }
	}

	// @Get('identity')
	// getUserIdentity(@User() { username }: UserTokenDto) {
	// 	return this.authClient.send('find_user', username)
	// }
	//
	// @Put('identity')
	// async updateUserIdentity(
	// 	@User() { username }: UserTokenDto,
	// 	@Body() body: UpdateIdentityDto,
	// ) {
	// 	const data = { username, payload: body }
	// 	return this.authClient.send('update_user', data)
	// }
	//
	// @Delete('identity')
	// removeUserIdentity(@User() { username }: UserTokenDto) {
	// 	return this.authClient.send('remove_user', username)
	// }
}
