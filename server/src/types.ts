import { DbService } from './services/types'
import { EncryptionService, FileService, TokenService } from './services/types'

export interface Services {
	db: DbService,
	file: FileService,
	encryption: EncryptionService,
	token: TokenService
}

export interface User {
	username: string,
	isAdmin: boolean
}
