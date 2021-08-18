import { Body, Controller, Delete, Get, HttpCode, Post, Put, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { User } from '../../decorators'
import { Public } from '../../jwt/jwt.guard'
import { Roles, UserType } from '../../types'
import { AuthService } from './auth.service'

interface UserCredentials {
	username: string,
	password: string
}

@Controller()
export class AuthController {
	constructor(
		private readonly jwtService: JwtService,
		private readonly authService: AuthService,
	) {}

	@Public()
	@Post('register')
	async register(@Body() body: UserCredentials) {
		const { username, password } = body

		if (!username) {
			throw new UnauthorizedException('Missing username')
		}

		const hashedPassword = await hash(password, 10).catch(() => {
			throw new UnauthorizedException('Invalid password')
		})

		const userInfo = { username, role: Roles.USER }
		const user = { ...userInfo, password: hashedPassword }
		await this.authService.addUser(user)
		return { token: this.jwtService.sign(userInfo) }
	}

	@Public()
	@Post('login')
	async login(@Body() body: UserCredentials) {
		const { username, password } = body

		if (!username || !password) {
			throw new UnauthorizedException('Missing username or password')
		}

		const user = await this.authService.getUser(username)

		if (!await compare(password, user.password)) {
			throw new UnauthorizedException('Incorrect password')
		}

		const userInfo = { username, role: user.role }
		return { token: this.jwtService.sign(userInfo) }
	}

	@Post()
	@HttpCode(204)
	checkAuth() {}

	@Get('permissions')
	getPermissions(@User() user: UserType) {
		return { role: user.role }
	}

	@Get('identity')
	getIdentity(@User() user: UserType) {
		return this.authService.getUser(user.username)
	}

	@Put('identity')
	async updateIdentity(@User() user: UserType, @Body() body: any) {
		const password = await hash(body.password, 10).catch(() => null)
		const newUser = { ...body, password }
		await this.authService.updateUser(user.username, newUser)
	}

	@Delete('identity')
	async deleteIdentity(@User() user: UserType) {
		await this.authService.deleteUser(user.username)
	}
}
