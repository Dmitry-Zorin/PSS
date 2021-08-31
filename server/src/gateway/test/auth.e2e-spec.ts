import supertest from 'supertest'
import { User } from '../../auth/user.entity'

const TEST_USER: User = {
	username: 'username',
	password: 'password',
}

const request = supertest('http://localhost:3000/api/auth/')

describe('AuthController', () => {
	afterEach(async () => {
		await request
			.delete('unregister')
			.send({ username: TEST_USER.username })
			.expect(200)
	})

	test('register and login', async () => {
		await request
			.post('register')
			.send(TEST_USER)
			.expect(201)
			.expect(res => {
				expect(res.body).toContainKey('token')
			})

		await request
			.post('register')
			.send(TEST_USER)
			.expect(409)

		await request
			.post('login')
			.send(TEST_USER)
			.expect(200)
			.expect(res => {
				expect(res.body).toContainKey('token')
			})
	})
})
