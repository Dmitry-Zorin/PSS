import jwt from '../../src/services/jsonwebtoken'

test('Create a token for an object', () => {
	const object = { test: 'test' }
	const token = jwt.sign(object)
	expect(token).toBeString()
	
	const { iat, exp, ...objectFromToken } = jwt.verify(token)
	expect(objectFromToken).toEqual(object)
	expect(+exp - +iat).toEqual(30 * 24 * 60 * 60)
})

test('Receive an error if the token expired', () => {
	const token = jwt.sign({}, 0)
	expect(token).toBeString()
	
	try {
		jwt.verify(token)
	}
	catch (err) {
		expect(err).toBeInstanceOf(Error)
	}
})
