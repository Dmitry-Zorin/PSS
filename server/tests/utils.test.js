import { generatePassword, projectTruthyProps, removeFalsyProps } from '../utils.js'

const falsyObject = {
	undefined: undefined,
	null: null,
	emptyString: '',
	zero: 0,
	false: false,
	nan: NaN,
}

const truthyObject = {
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

test('Project only truthy props from an object', () => {
	for (const [key, value] of Object.entries(truthyObject)) {
		const object = projectTruthyProps(testObject, { [key]: 1 })
		expect(object).toEqual({ [key]: value })
	}
})

test('Generate a password from a non empty string', async () => {
	const password = await generatePassword('0', 1)
	expect(password).toBeString()
})

test('Return null if the password is not a non empty string', async () => {
	const dataTypes = ['', 0, [], {}, undefined, null, false]
	const passwordPromises = dataTypes.map(generatePassword)
	const passwords = await Promise.all(passwordPromises)
	passwords.forEach(p => expect(p).toBeNull())
})
