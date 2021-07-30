import { DbService } from '../db/db.types'
import { EncryptionService } from '../services/encryption/encryption.types'
import { FileService } from '../services/file/file.types'
import { TokenService } from '../services/token/token.types'

export interface Services {
	db: DbService,
	file: FileService,
	encryption: EncryptionService,
	token: TokenService
}
