import { fetchApi } from '../utils/utils'

let fetchTestApi: typeof fetchApi

const createFetchFunction = (token: string) => {
	fetchTestApi = (path = '', options) => (
		fetchApi(path, options, token)
	)
}

const login = async () => {
	const { json } = await fetchApi('auth/login', {
		method: 'post',
		body: new URLSearchParams({
			username: 'dima',
			password: 'zorin',
		}),
	})
	expect(json.error).toBeUndefined()
	expect(json.token).toBeString()
	createFetchFunction(json.token)
}

beforeAll(login)

test('Get the collection counts', async () => {
	const { json } = await fetchTestApi('resources')
	expect(json.error).toBeUndefined()
	Object.entries(json).forEach(([_, value]) => {
		expect(value).toBeNumber()
	})
})
