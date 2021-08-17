import { fetchJson } from '../helpers'

const user = {
	token: '',
	username: 'auth test username',
	password: 'auth test password',
}

const register = async () => {
	const options = { method: 'post', body: JSON.stringify(user) }
	const { json } = await fetchJson('auth/register', options)
	expect(json.error).toBeUndefined()
	expect((user.token = json.token)).toBeString()
}

const unregister = async () => {
	const { status } = await fetchJson('auth/identity', { method: 'delete' }, user.token)
	expect(status).toBe(200)
}

beforeEach(register)
afterEach(unregister)

test('Cannot register another user with the same username', async () => {
	const options = { method: 'post', body: JSON.stringify(user) }
	const { json } = await fetchJson('auth/register', options)
	expect(json.error).toBeObject()
	expect(json.error.name).toBe('ConflictError')
})

test('Update the identity settings', async () => {
	const settings = {
		locale: 'en',
		theme: 'dark',
		isAdmin: 'true',
	}
	const options = { method: 'put', body: JSON.stringify(settings) }
	const { status } = await fetchJson('auth/identity', options, user.token)
	expect(status).toBe(200)
	
	const { isAdmin, ...identity } = settings
	const { json } = await fetchJson('auth/identity', {}, user.token)
	expect(json).toEqual(expect.objectContaining(identity))
	expect(json.username).toBe(user.username)
	expect(json.isAdmin).toBeFalse()
})
