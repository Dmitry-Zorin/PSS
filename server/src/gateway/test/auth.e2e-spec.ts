import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'
import { Test } from '@nestjs/testing'
import supertest from 'supertest'
import { AuthModule } from '../../auth/auth.module'
import { User } from '../../auth/user.entity'
import { GatewayModule } from '../gateway.module'

const TEST_USER: User = {
	username: 'username',
	password: 'password',
}

describe('AuthController', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [ConfigModule, GatewayModule, AuthModule],
		}).compile()

		app = module.createNestApplication()
		const config = app.get(ConfigService)

		app.connectMicroservice({
			transport: Transport.RMQ,
			options: {
				urls: [config.get('RMQ_URL')],
				queue: config.get('AUTH_QUEUE'),
			},
		})

		await app.startAllMicroservices()
		await app.listen(80)

		request = supertest('http://localhost:80/api/auth/')
	})

	afterEach(async () => {
		await request
			.delete('unregister')
			.send({ username: TEST_USER.username })
			.expect(200)
	})

	afterAll(() => app.close())

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
