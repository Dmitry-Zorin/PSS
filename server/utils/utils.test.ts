import { projectNonNullishProps, removeNullishProps } from './utils'

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
