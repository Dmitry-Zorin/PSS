import { Router } from 'express'
import errorCatcher from '../../../middleware/errorCatcher'
import { setFilter } from '../users/handlers'
import {
	checkAuth,
	checkPermissions,
	deleteIdentity,
	getIdentity,
	login,
	register,
	updateIdentity,
} from './handlers'

const authRouter = Router({ mergeParams: true })
	.param('id', setFilter)
	.post('/register', errorCatcher(register))
	.post('/login', errorCatcher(login))
	.get('/', errorCatcher(checkAuth))
	.get('/permissions', errorCatcher(checkPermissions))
	.get('/identity', errorCatcher(getIdentity))
	.put('/identity', errorCatcher(updateIdentity))
	.delete('/identity', errorCatcher(deleteIdentity))

export default authRouter
