import { generatePassword, removeEmptyProps } from '../utils.js'

test('Remove empty props from an object', () => {
	const object = {
		undefined: undefined,
		null: null,
		emptyString: '',
		zero: 0,
		false: false,
		nan: NaN,
	}
	expect(removeEmptyProps(object)).toEqual({})
})

test('Generate a password from a non empty string', async () => {
	const password = await generatePassword('0', 1)
	expect(password).toBeTruthy()
})

test('Return null if the password is not a non empty string', async () => {
	const dataTypes = ['', 0, [], {}, undefined, null, false]
	
	for (const type of dataTypes) {
		const password = await generatePassword(type, 1)
		expect(password).toBeNull()
	}
})
