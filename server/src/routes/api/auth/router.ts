import { Router } from 'express'
import { createSafeHandler } from '../../../middleware'
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
	.post('/register', createSafeHandler(register))
	.post('/login', createSafeHandler(login))
	.get('/', createSafeHandler(checkAuth))
	.get('/permissions', createSafeHandler(checkPermissions))
	.get('/identity', createSafeHandler(getIdentity))
	.put('/identity', createSafeHandler(updateIdentity))
	.delete('/identity', createSafeHandler(deleteIdentity))

export default authRouter
