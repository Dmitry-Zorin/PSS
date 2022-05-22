import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'
import { Test } from '@nestjs/testing'
import supertest from 'supertest'
import { AuthModule } from '../../microservices/auth/auth.module'
import { ApiGatewayModule } from '../api-gateway.module'

const AUTH_URL = '/api/auth'

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
			imports: [ConfigModule, ApiGatewayModule, AuthModule],
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

		request = supertest(app.getHttpServer())
	})

	beforeEach(async () => {
		const { body } = await request
			.post(`${AUTH_URL}/register`)
			.send(TEST_USER)
			.expect(201)

		expect(body).toContainKey('token')
		token = body.token
	})

	afterEach(async () => {
		await request
			.delete(`${AUTH_URL}/unregister`)
			.auth(token, { type: 'bearer' })
			.expect(200)
	})

	afterAll(async () => {
		await app.close()
	})

	test('should fail to register the same user', async () => {
		await request.post(`${AUTH_URL}/register`).send(TEST_USER).expect(409)
	})

	test('should login the existing user', async () => {
		const { body } = await request
			.post(`${AUTH_URL}/login`)
			.send(TEST_USER)
			.expect(200)

		expect(body).toContainKey('token')
	})
})
