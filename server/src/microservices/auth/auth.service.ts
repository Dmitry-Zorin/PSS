import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { hash, verify } from 'argon2'
import { omit } from 'lodash'
import { EntityManager, Repository } from 'typeorm'
import { CONNECTION_NAME } from './constants'
import { SettingsDto } from './dto'
import { Settings, User } from './entities'

interface FindOptions {
	withSettings?: boolean
	passwordToVerify?: string
}

@Injectable()
export class AuthService {
	constructor(
		@InjectEntityManager(CONNECTION_NAME)
		private readonly entityManager: EntityManager,

		@InjectRepository(User, CONNECTION_NAME)
		private readonly userRepository: Repository<User>,

		@InjectRepository(Settings, CONNECTION_NAME)
		private readonly settingsRepository: Repository<Settings>,
	) {}

	async createUser(username: string, password: string) {
		return this.entityManager.transaction(async (manager) => {
			const user = manager.create(User, {
				username,
				password: await hash(password),
			})

			try {
				await manager.insert(User, user)
			} catch (e: any) {
				console.log(e)
				throw new ConflictException('User already exists')
			}

			const settings = manager.create(Settings, { userId: user.id })
			await manager.insert(Settings, settings)

			return {
				...omit(user, 'password'),
				settings,
			}
		})
	}

	async updateSettings(id: string, settings: SettingsDto) {
		await this.settingsRepository.update(id, settings)
	}

	async findUser(filter: Record<string, any>, options = {} as FindOptions) {
		const { withSettings = true, passwordToVerify } = options

		const [user] = await this.userRepository.find({
			where: filter,
			relations: {
				settings: withSettings,
			},
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		if (passwordToVerify) {
			const isCorrectPassword = await verify(user.password, passwordToVerify)
			if (!isCorrectPassword) {
				throw new UnauthorizedException('Incorrect password')
			}
		}

		return omit(user, 'password')
	}

	async removeUser(id: string) {
		await this.entityManager.transaction(async (manager) => {
			await manager.delete(Settings, id)
			await manager.delete(User, id)
		})
		return null
	}
}
