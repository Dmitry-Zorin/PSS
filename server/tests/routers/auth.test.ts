import { fetchApi } from '../helpers'

const user = {
	token: '',
	username: 'test',
	password: 'test',
}

const register = async () => {
	const options = { method: 'post', body: new URLSearchParams(user) }
	const { json } = await fetchApi('auth/register', options)
	expect(json.error).toBeUndefined()
	expect((user.token = json.token)).toBeString()
}

const unregister = async () => {
	const { status } = await fetchApi('auth/identity', { method: 'delete' }, user.token)
	expect(status).toBe(200)
}

beforeEach(register)
afterEach(unregister)

test('Cannot register another user with the same username', async () => {
	const options = { method: 'post', body: new URLSearchParams(user) }
	const { json } = await fetchApi('auth/register', options)
	expect(json.error).toBeObject()
	expect(json.error.name).toBe('ConflictError')
})

test('Update the identity settings', async () => {
	const settings = {
		locale: 'en',
		theme: 'dark',
		isAdmin: 'true',
	}
	const options = { method: 'put', body: new URLSearchParams(settings) }
	const { status } = await fetchApi('auth/identity', options, user.token)
	expect(status).toBe(200)
	
	const { isAdmin, ...identity } = settings
	const { json } = await fetchApi('auth/identity', {}, user.token)
	expect(json).toEqual(expect.objectContaining(identity))
	expect(json.username).toBe(user.username)
	expect(json.isAdmin).toBeFalse()
})
