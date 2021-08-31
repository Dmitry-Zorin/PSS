import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, hash } from 'bcrypt'
import { Repository } from 'typeorm'
import { User } from './user.entity'

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
		const { generatedMaps } = await this.userRepository.insert(user).catch((err) => {
			throw new ConflictException('User already exists')
		})
		return { ...user, ...generatedMaps[0] } as User
	}

	findUser(username: string) {
		return this.userRepository.findOneOrFail(username).catch(() => {
			throw new NotFoundException('User not found')
		})
	}

	removeUser(username: string) {
		return this.userRepository.delete(username)
	}
}
