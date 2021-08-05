import { createFetchFunction, FetchFunction } from '../helpers'

const user = {
	id: '',
	username: 'test username',
	isAdmin: false,
}

let fetchTestApi: FetchFunction

const createUser = async () => {
	const body = JSON.stringify({ ...user, password: 'test' })
	const { json } = await fetchTestApi('', { method: 'post', body })
	expect(json.error).toBeUndefined()
	expect((user.id = json.id)).toBeString()
}

const deleteUser = async () => {
	await fetchTestApi(user.id, { method: 'delete' })
}

beforeAll(async () => {
	fetchTestApi = await createFetchFunction('users')
})

beforeEach(createUser)
afterEach(deleteUser)

test('Find a user', async () => {
	const { json } = await fetchTestApi(user.id)
	expect(json).toEqual(expect.objectContaining(user))
})

test('Find a list of users', async () => {
	const { json } = await fetchTestApi()
	expect(json).toBeArray()
	expect(json.length).toBeGreaterThan(0)
	
	const fields = ['id', 'username', 'isAdmin', 'createdAt']
	expect(json).toEqual(json.map(() => expect.toContainAllKeys(fields)))
})

test('Update a user', async () => {
	const updatedUser = { isAdmin: true }
	const body = JSON.stringify(updatedUser)
	await fetchTestApi(user.id, { method: 'put', body })
	
	const { json } = await fetchTestApi(user.id)
	expect(json).toEqual(expect.objectContaining(updatedUser))
})
