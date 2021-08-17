import { Body, ConflictException, Controller, Delete, Get, HttpCode, NotFoundException, Post, Put, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcrypt'
import { DbService } from '../../db/db.service'
import { User } from '../../decorators'
import { Public } from '../../jwt/jwt.guard'
import { UserType } from '../../types'

const COLLECTION = 'users'

interface UserCredentials {
	username: string,
	password: string
}

const getFilter = (user: { username: string }) => (
	{ username: user.username }
)

@Controller()
export class AuthController {
	constructor(
		private readonly db: DbService,
		private readonly jwt: JwtService,
	) {}

	@Public()
	@Post('register')
	async register(@Body() body: UserCredentials) {
		const { username, password } = body

		if (!username) {
			throw new UnauthorizedException('Missing username')
		}

		const hashed = await hash(password, 10).catch(() => {
			throw new UnauthorizedException('Invalid password')
		})

		const user = { username, password: hashed, isAdmin: false }

		await this.db.addDocument(COLLECTION, user).catch(err => {
			if (err?.code !== 11000) throw err
			throw new ConflictException('User already exists')
		})

		const { password: _, ...userInfo } = user
		return { token: this.jwt.sign(userInfo) }
	}

	@Public()
	@Post('login')
	async login(@Body() body: UserCredentials) {
		const { username, password } = body
		if (!username || !password) {
			throw new UnauthorizedException('Missing username or password')
		}

		const projection = { username: 1, password: 1, isAdmin: 1 } as const
		const user = await this.db.getDocument(COLLECTION, { username }, projection).catch(() => {
			throw new NotFoundException('User not found')
		})

		if (!await compare(password, user.password)) {
			throw new UnauthorizedException('Incorrect password')
		}

		const { password: _, ...userInfo } = user
		return { token: this.jwt.sign(userInfo) }
	}

	@Post()
	@HttpCode(204)
	checkAuth() {}

	@Get('permissions')
	getPermissions(@User() user: UserType) {
		return { isAdmin: user.isAdmin }
	}

	@Get('identity')
	getIdentity(@User() user: UserType) {
		const projection = { username: 1, isAdmin: 1, locale: 1, theme: 1 } as const
		return this.db.getDocument(COLLECTION, getFilter(user), projection)
	}

	@Put('identity')
	async updateIdentity(@User() user: UserType, @Body() body: any) {
		const password = await hash(body.password, 10)
		const payload = { ...body, password }
		const projection = { password: 1, locale: 1, theme: 1 } as const
		await this.db.updateDocument(COLLECTION, getFilter(user), payload, projection)
	}

	@Delete('identity')
	async deleteIdentity(@User() user: UserType) {
		await this.db.deleteDocument(COLLECTION, getFilter(user))
	}
}
