import { json, Router, urlencoded } from 'express'
import jwt from 'express-jwt'
import { createEnvError } from '../../../errors'
import authRouter from './auth/router'
import extraRouter from './extra'
import resourceRouter from './resources/router'
import usersRouter from './users/router'

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
