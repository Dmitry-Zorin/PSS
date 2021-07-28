import jsonwebtoken from 'jsonwebtoken'
import { createEnvError } from '../errors'

const tokenService = {
	sign: (payload: Record<string, string>) => {
		const key = process.env.SECRET_KEY
		if (!key) throw createEnvError('secret_key')
		const options = { expiresIn: 31536000 }
		return jsonwebtoken.sign(payload, key, options)
	},
}

export default tokenService
