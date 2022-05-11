import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { Locale, Theme, User } from './user.entity'

interface Settings {
	locale?: Locale,
	theme?: Theme
}

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	getToken(user: User) {
		const { password, ...tokenPayload } = user
		return this.jwtService.sign(tokenPayload)
	}

	hashPassword(password: string) {
		return hash(password, 10)
	}

	async verifyPassword(password: string, hash: string) {
		if (!await compare(password, hash)) {
			throw new UnauthorizedException('Incorrect password')
		}
	}

	async createUser(user: User) {
		const record = await this.userRepository.findOneBy({ username: user.username })
		if (record) {
			throw new ConflictException('User already exists')
		}
		return this.userRepository.save(user)
	}

	updateSettings(username: string, settings: Settings) {
		return this.userRepository.save({ username, ...settings })
	}

	findUser(username: string) {
		return this.userRepository.findOneByOrFail({ username }).catch(() => {
			throw new NotFoundException('User not found')
		})
	}

	async removeUser(username: string) {
		const user = await this.findUser(username)
		return this.userRepository.remove(user)
	}
}
