import bcrypt from 'bcrypt'
import { CryptService } from './types'

const cryptService: CryptService = {
	hash: async (string, salt = 10) => (
		string ? bcrypt.hash(string, salt).catch(() => null) : null
	),
	compare: (string, hash) => (
		bcrypt.compare(string, hash).catch(() => false)
	),
}

export default cryptService
