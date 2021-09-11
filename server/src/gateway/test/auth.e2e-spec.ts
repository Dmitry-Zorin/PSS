import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'
import { Test } from '@nestjs/testing'
import supertest from 'supertest'
import { AuthModule } from '../../auth/auth.module'
import { GatewayModule } from '../gateway.module'

const TEST_USER = {
	username: 'username',
	password: 'password',
}

describe('AuthController', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let token: string

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

		const appUrl = await app.getUrl()
		request = supertest(`${appUrl}/api/auth/`)
	})

	beforeEach(async () => {
		const { body } = await request
			.post('register')
			.send(TEST_USER)
			.expect(201)

		expect(body).toContainKey('token')
		token = body.token
	})

	afterEach(async () => {
		await request
			.delete('unregister')
			.auth(token, { type: 'bearer' })
			.expect(200)
	})

	afterAll(() => app.close())

	test('should fail to register the same user', async () => {
		await request
			.post('register')
			.send(TEST_USER)
			.expect(409)
	})

	test('should login the existing user', async () => {
		const { body } = await request
			.post('login')
			.send(TEST_USER)
			.expect(200)

		expect(body).toContainKey('token')
	})
})