import { json, Router, urlencoded } from 'express'
import jwt from 'express-jwt'
import resourceRouter from './resource'
import authRouter from './auth'
import extraRouter from './extra'
import usersRouter from './user'
import { createEnvError } from '../errors'

const { SECRET_KEY } = process.env

if (!SECRET_KEY) {
	throw createEnvError('secret_key')
}

const router = Router()

router.use(json())
router.use(urlencoded({ extended: true }))

const jwtHandler = jwt({
	secret: SECRET_KEY,
	algorithms: ['HS256'],
})
router.use(jwtHandler.unless({ path: /.+(login|register)/ }))

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use(extraRouter)
router.use(resourceRouter)

export default router

declare global {
	namespace Express {
		interface User {
			username: string,
			isAdmin: boolean
		}
		
		interface Request {
			user?: User | undefined;
		}
	}
}
