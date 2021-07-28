import { generatePassword, projectNonNullishProps, removeNullishProps } from '../utils'
import 'jest-extended'

const nullishObject: any = {
	undefined: undefined,
	null: null,
}

const normalObject: any = {
	true: true,
	one: 1,
	string: 'string',
	array: [],
	object: {},
	emptyString: '',
	zero: 0,
	false: false,
	nan: NaN,
}

const testObject = { ...nullishObject, ...normalObject }

test('Remove all nullish props from an object', () => {
	expect(removeNullishProps(testObject)).toEqual(normalObject)
})

describe('Project only non nullish props from an object', () => {
	test.each(Object.entries(normalObject))('Test { %s: %s }', (key, value) => {
		const object = projectNonNullishProps(testObject, { [key]: 1 })
		expect(object).toEqual({ [key]: value })
	})
})

test('Generate a password from a non empty string', async () => {
	const password = await generatePassword('0', 1)
	expect(password).toBeString()
})

test('Return empty string if the password is not a non empty string', async () => {
	const dataTypes = ['', 0, [], {}, undefined, null, false]
	const passwordPromises = dataTypes.map((e: any) => generatePassword(e, 1))
	const passwords = await Promise.all(passwordPromises)
	expect(passwords).toEqual(passwords.map(() => null))
})
