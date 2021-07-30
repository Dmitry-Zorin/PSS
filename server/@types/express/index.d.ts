import { Services } from '../../src/app/types'
import { User } from '../../src/app/middleware/tokenParser'

declare global {
	namespace Express {
		interface Application {
			services: Services
		}
		interface Request {
			user: User
		}
	}
}
