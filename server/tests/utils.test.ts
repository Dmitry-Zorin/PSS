import { generatePassword, projectTruthyProps, removeFalsyProps } from '../utils'
import 'jest-extended'

const falsyObject: any = {
	undefined: undefined,
	null: null,
	emptyString: '',
	zero: 0,
	false: false,
	nan: NaN,
}

const truthyObject: any = {
	true: true,
	one: 1,
	string: 'string',
	array: [],
	object: {},
}

const testObject = { ...truthyObject, ...falsyObject }

test('Remove all falsy props from an object', () => {
	expect(removeFalsyProps(testObject)).toEqual(truthyObject)
})

describe('Project only truthy props from an object', () => {
	test.each(Object.entries(truthyObject))('Test { %s: %s }', (key, value) => {
		const object = projectTruthyProps(testObject, { [key]: 1 })
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
	passwords.forEach(e => expect(e).toBe(''))
})
