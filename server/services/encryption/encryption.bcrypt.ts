import bcrypt from 'bcrypt'
import { EncryptionService } from './encryption.types'

const encryptionService: EncryptionService = {
	hash: async (string, salt = 10) => (
		string ? bcrypt.hash(string, salt).catch(() => null) : null
	),
	compare: (string, hash) => (
		bcrypt.compare(string, hash).catch(() => false)
	),
}

export default encryptionService
