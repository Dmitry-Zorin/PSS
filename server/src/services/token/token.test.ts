import tkn from './token.jsonwebtoken'

beforeAll(() => {
	process.env.SECRET_KEY = 'some key'
})

test('Create a token for an object', () => {
	const object = { test: 'test' }
	const token = tkn.sign(object)
	expect(token).toBeString()
	
	const { iat, exp, ...objectFromToken } = tkn.verify(token)
	expect(objectFromToken).toEqual(object)
	expect(+exp - +iat).toEqual(30 * 24 * 60 * 60)
})

test('Receive an error if the token expired', () => {
	const token = tkn.sign({}, 0)
	expect(token).toBeString()
	
	try {
		tkn.verify(token)
	}
	catch (err) {
		expect(err).toBeInstanceOf(Error)
	}
})
