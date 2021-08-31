import { omitBy } from 'lodash'
import { User } from '../user.entity'

export class UserRepositoryMock {
	private readonly users = new Map<string, Required<User>>()

	async insert(user: User) {
		if (this.users.has(user.username)) {
			return Promise.reject()
		}

		const defaultProps = { role: 'user' }

		this.users.set(
			user.username,
			{ ...defaultProps, ...user } as Required<User>,
		)

		return {
			generatedMaps: [
				omitBy(defaultProps, (_, key) => key in user),
			],
		}
	}

	async findOneOrFail(username: string) {
		if (!this.users.has(username)) {
			return Promise.reject()
		}
		return this.users.get(username)
	}
}
