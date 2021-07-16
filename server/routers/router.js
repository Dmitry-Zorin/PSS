import { json, Router } from 'express'
import jwt from 'express-jwt'
import authRouter from './auth.js'
import userRouter from './users.js'
import extraRouter from './extra.js'

const router = Router()

router.use(json())

router.use(jwt({
	secret: process.env.SECRET_KEY,
	algorithms: ['HS256'],
}).unless({ path: /.+login/ }))

router.use(extraRouter)
router.use('/auth', authRouter)
router.use('/users', userRouter)

export default router
