import { json, Router, urlencoded } from 'express'
import { removeFile } from '../../middleware'
import authRouter from './auth-router'
import extraRouter from './extra'
import resourceRouter from './resources-router'
import usersRouter from './users-router'

const apiRouter = Router()
	.use(json())
	.use(urlencoded({ extended: true }))
	.use('/auth', authRouter)
	.use('/users', usersRouter)
	.use(extraRouter)
	.use(resourceRouter)
	.use(removeFile)

export default apiRouter
