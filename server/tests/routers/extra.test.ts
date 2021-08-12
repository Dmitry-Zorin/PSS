import { forEach } from 'lodash'
import { createFetchFunction, FetchFunction } from '../helpers'

let fetchTestApi: FetchFunction

beforeAll(async () => {
	fetchTestApi = await createFetchFunction()
})

test('Get the collection counts', async () => {
	const { json } = await fetchTestApi('resources')
	expect(json.error).toBeUndefined()
	forEach(json, value => expect(value).toBeNumber())
})
