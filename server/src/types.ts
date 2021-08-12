import { CryptService, DbService, FsService, JwtService } from './services/types'

export interface Services {
	db: DbService,
	fs: FsService,
	crypt: CryptService,
	jwt: JwtService
}

export interface User {
	username: string,
	isAdmin: boolean
}
