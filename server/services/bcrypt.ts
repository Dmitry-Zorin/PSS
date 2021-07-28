import bcrypt from 'bcrypt'
import { EncryptionService } from './types'

const encryptionService: EncryptionService = {
	hash: async (password, salt = 10) => (
		password ? bcrypt.hash(password, salt).catch(() => null) : null
	),
	compare: (password, hash) => (
		bcrypt.compare(password, hash).catch(() => false)
	),
}

export default encryptionService
