import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { DbService } from '../../db/db.service'

@Injectable()
export class AuthService {
	private readonly collection = 'users'

	constructor(private readonly dbService: DbService) {}

	addUser(user: any) {
		return this.dbService.addDocument(this.collection, user).catch(err => {
			if (err instanceof ConflictException) {
				throw new ConflictException('User already exists')
			}
			throw err
		})
	}

	getUser(username: string) {
		return this.dbService.getDocument(this.collection, { username }).catch(err => {
			if (err instanceof NotFoundException) {
				throw new NotFoundException('User not found')
			}
			throw err
		})
	}

	updateUser(username: string, newUser: any) {
		return this.dbService.updateDocument(this.collection, { username }, newUser)
	}

	deleteUser(username: string) {
		return this.dbService.deleteDocument(this.collection, { username })
	}
}
