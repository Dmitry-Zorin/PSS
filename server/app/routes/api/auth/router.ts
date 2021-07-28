import { Router } from 'express'
import { checkAuth, checkPermissions, deleteIdentity, getIdentity, login, register, updateIdentity } from './handlers'
import errorCatcher from '../../../middleware/errorCatcher'

const authRouter = Router({ mergeParams: true })
	.post('/register', errorCatcher(register))
	.post('/login', errorCatcher(login))
	.get('/', errorCatcher(checkAuth))
	.get('/permissions', errorCatcher(checkPermissions))
	.get('/identity', errorCatcher(getIdentity))
	.put('/identity', errorCatcher(updateIdentity))
	.delete('/identity', errorCatcher(deleteIdentity))

export default authRouter
