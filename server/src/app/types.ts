import { DbService } from '../db/types'
import { EncryptionService, FileService, TokenService } from '../services/types'

export interface Services {
	db: DbService,
	file: FileService,
	encryption: EncryptionService,
	token: TokenService
}
