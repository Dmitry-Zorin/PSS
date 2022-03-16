import { User } from '../user.entity'

export class UserRepositoryMock {
	private readonly users = new Map<string, Required<User>>()

	async save(user: User) {
		if (this.users.has(user.username)) {
			return Promise.reject()
		}

		const defaultProps = { role: 'user' }
		const newUser = { ...defaultProps, ...user } as Required<User>

		this.users.set(user.username, newUser)

		return newUser
	}

	async remove(user: User) {
		this.users.delete(user.username)
	}

	async findOne(username: string) {
		return this.users.get(username)
	}

	async findOneOrFail(username: string) {
		if (!this.users.has(username)) {
			return Promise.reject()
		}
		return this.users.get(username)
	}
}
