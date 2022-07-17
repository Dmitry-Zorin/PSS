import {
	BadRequestException,
	ConflictException,
	Injectable,
	Logger,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { omit } from 'lodash'
import { EntityManager, QueryFailedError, Repository } from 'typeorm'
import { CONNECTION_NAME, SALT_ROUNDS } from './constants'
import { SettingsDto } from './dto'
import { Settings, User } from './entities'

interface FindOptions {
	withSettings?: boolean
	passwordToVerify?: string
}

@Injectable()
export class AuthService {
	private readonly logger = new Logger('AuthService')

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
				password: await hash(password, await genSalt(SALT_ROUNDS)),
			})

			try {
				await manager.insert(User, user)
			} catch (e: any) {
				if (e instanceof QueryFailedError) {
					if (e.message.startsWith('duplicate key')) {
						throw new ConflictException('User already exists')
					}
				}
				this.logger.error(e, e?.stack)
				throw new BadRequestException('Failed to create user')
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

	async findUser(filter: Record<string, any>, options: FindOptions = {}) {
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
			const isCorrectPassword = await compare(passwordToVerify, user.password)
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
	}
}
