import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'
import { Test } from '@nestjs/testing'
import supertest from 'supertest'
import { AuthModule } from '../../auth/auth.module'
import { ResourcesModule } from '../../resources/resources.module'
import { GatewayModule } from '../gateway.module'

const AUTH_URL = '/api/auth'
const RESOURCE_URL = '/api/resources/articles'

const TEST_USER = {
	username: `test user ${Date.now()}`,
	password: 'password',
}

const TEST_RESOURCE: any = {
	title: 'title',
	authors: ['author'],
}

describe('ResourcesController', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let token: string

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [ConfigModule, GatewayModule, AuthModule, ResourcesModule],
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

		app.connectMicroservice({
			transport: Transport.RMQ,
			options: {
				urls: [config.get('RMQ_URL')],
				queue: config.get('RESOURCES_QUEUE'),
			},
		})

		await app.startAllMicroservices()
		await app.listen(80)

		request = supertest(app.getHttpServer())
	})

	beforeEach(async () => {
		const res = await request
			.post(`${AUTH_URL}/register`)
			.send(TEST_USER)
			.expect(201)

		expect(res.body).toContainKey('token')
		token = res.body.token

		const { body } = await request
			.post(RESOURCE_URL)
			.auth(token, { type: 'bearer' })
			.send(TEST_RESOURCE)
			.expect(201)

		expect(body).toContainKey('id')
		TEST_RESOURCE.id = body.id
	})

	afterEach(async () => {
		await request
			.delete(`${RESOURCE_URL}/${TEST_RESOURCE.id}`)
			.auth(token, { type: 'bearer' })
			.expect(200)

		await request
			.delete(`${AUTH_URL}/unregister`)
			.auth(token, { type: 'bearer' })
			.expect(200)
	})

	afterAll(async () => {
		await app.close()
	})

	test('should find a list of resources', async () => {
		const { body } = await request
			.get(RESOURCE_URL)
			.auth(token, { type: 'bearer' })
			.query({
				match: JSON.stringify({ title: TEST_RESOURCE.title }),
				sort: JSON.stringify({ title: 1 }),
				skip: 0,
				limit: 25,
			})
			.expect(200)

		expect(body).toBeArray()
		expect(body.length).toBeGreaterThanOrEqual(1)
	})

	test('should find a resource', async () => {
		const { body } = await request
			.get(`${RESOURCE_URL}/${TEST_RESOURCE.id}`)
			.auth(token, { type: 'bearer' })
			.expect(200)

		expect(body).toEqual(expect.objectContaining(TEST_RESOURCE))
	})

	test('should update a resource', async () => {
		const resourceUpdate = {
			title: 'new title',
		}

		await request
			.put(`${RESOURCE_URL}/${TEST_RESOURCE.id}`)
			.auth(token, { type: 'bearer' })
			.send(resourceUpdate)
			.expect(200)

		const { body } = await request
			.get(`${RESOURCE_URL}/${TEST_RESOURCE.id}`)
			.auth(token, { type: 'bearer' })
			.expect(200)

		expect(body).toEqual(expect.objectContaining({
			...TEST_RESOURCE,
			...resourceUpdate,
		}))
	})
})
