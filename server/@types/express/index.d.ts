import { Services, User } from '../../src/types'

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
