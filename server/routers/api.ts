import { json, Router, urlencoded } from 'express'
import jwt from 'express-jwt'
import resourceRouter from './resource'
import authRouter from './auth'
import extraRouter from './extra'
import usersRouter from './user'

const router = Router()

router.use(json())
router.use(urlencoded({ extended: true }))
router.use(jwt({
	secret: process.env.SECRET_KEY || '',
	algorithms: ['HS256'],
}).unless({ path: /.+(login|register)/ }))

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use(resourceRouter)
router.use(extraRouter)

export default router
