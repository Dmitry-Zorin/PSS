import { json, Router } from 'express'
import { tokenParser } from '../middleware'
import authRouter from './auth'
import extraRouter from './extra'
import resourceRouter from './resource'
import userRouter from './user'

const apiRouter = Router()
	.use(tokenParser({ path: /(register|login)$/ }))
	.use(json())
	.use('/auth', authRouter)
	.use('/users', userRouter)
	.use(extraRouter)
	.use(resourceRouter)

export default apiRouter
