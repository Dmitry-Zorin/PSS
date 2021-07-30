import jsonwebtoken from 'jsonwebtoken'
import { createEnvError } from '../utils/errors'
import { TokenService } from './types'

const getSecretKey = () => {
	const key = process.env.SECRET_KEY
	if (!key) throw createEnvError('secret_key')
	return key
}

const tokenService: TokenService = {
	sign: (payload, expiresIn = '30 days') => {
		return jsonwebtoken.sign(payload, getSecretKey(), { expiresIn })
	},
	verify: (token) => (
		jsonwebtoken.verify(token, getSecretKey()) as Record<string, boolean | number | string>
	),
}

export default tokenService
