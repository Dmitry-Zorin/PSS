import jsonwebtoken from 'jsonwebtoken'
import { createEnvError } from '../helpers/errors'
import { JwtService } from './types'

const secretKey = process.env.SECRET_KEY

if (!secretKey) {
	throw createEnvError('secret_key')
}

const jwtService: JwtService = {
	sign: (payload, expiresIn = '30 days') => {
		return jsonwebtoken.sign(payload, secretKey, { expiresIn })
	},
	verify: (token) => (
		jsonwebtoken.verify(token, secretKey) as Record<string, boolean | number | string>
	),
}

export default jwtService
