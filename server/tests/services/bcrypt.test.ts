import encService from '../../src/services/bcrypt'

const generateRandomString = (length: number) => (
	Math.random().toString(36).slice(2, 2 + length)
)

describe('Generate a hash for a non-empty string', () => {
	const strings = [...Array(9).keys()]
		.map(i => generateRandomString(i + 2))
	
	test.each(['0', ...strings])('Testing: %s', async (string) => {
		const hash = await encService.hash(string)
		expect(hash).toBeString()
		const isCorrectHash = await encService.compare(string, hash!)
		expect(isCorrectHash).toBeTrue()
	})
})

describe('Return null for an empty string or non-string', () => {
	const dataTypes: any[] = ['', undefined, null, true, 1, [1], { 'one': 1 }]
	
	test.each(dataTypes)('Testing: %j', async (type) => {
		const hash = await encService.hash(type)
		expect(hash).toBeNull()
	})
})

test('Return false when the hash is empty or does not correspond to the string', async () => {
	const string1 = 'some string'
	const string2 = 'another string'
	const hash1 = await encService.hash(string1)
	const hash2 = await encService.hash(string2)
	
	expect(await encService.compare(string1, '')).toBeFalse()
	expect(await encService.compare(string1, hash2!)).toBeFalse()
	expect(await encService.compare(string2, hash1!)).toBeFalse()
})
