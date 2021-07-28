import { DbService, FileService } from '../../db/types'

declare global {
	namespace Express {
		interface Application {
			dbService: DbService,
			fileService: FileService
		}
	}
}
