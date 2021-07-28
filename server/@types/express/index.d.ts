import { DbService, FileService } from '../../db/types'
import { EncryptionService, TokenService } from '../../services/types'

declare global {
	namespace Express {
		interface Application {
			services: {
				db: DbService,
				file: FileService,
				encryption: EncryptionService,
				token: TokenService
			}
		}
	}
}
