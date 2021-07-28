import { json, Router, urlencoded } from 'express'
import jwt from 'express-jwt'
import resourceRouter from './resources/router'
import authRouter from './auth/router'
import extraRouter from './extra'
import usersRouter from './users/router'
import { createEnvError } from '../../../errors'

const { SECRET_KEY } = process.env

if (!SECRET_KEY) {
	throw createEnvError('secret_key')
}

const jwtHandler = jwt({
	secret: SECRET_KEY,
	algorithms: ['HS256'],
	resultProperty: 'locals.user',
})

const apiRouter = Router()
	.use(json())
	.use(urlencoded({ extended: true }))
	.use(jwtHandler.unless({ path: /.+(login|register)$/ }))
	.use('/auth', authRouter)
	.use('/users', usersRouter)
	.use(extraRouter)
	.use(resourceRouter)

export default apiRouter
