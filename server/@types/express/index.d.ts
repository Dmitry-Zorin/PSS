import { Services } from '../../app/app.types'
import { User } from '../../app/middleware/tokenParser'

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
