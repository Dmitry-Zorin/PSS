import { json, Router, urlencoded } from 'express'
import jwt from 'express-jwt'
import articlesRouter from './articles.js'
import authRouter from './auth.js'
import extraRouter from './extra.js'
import usersRouter from './users.js'

const router = Router()

router.use(json())
router.use(urlencoded({ extended: true }))
router.use(jwt({
	secret: process.env.SECRET_KEY,
	algorithms: ['HS256'],
}).unless({ path: /.+(login|register)/ }))

router.use(extraRouter)
router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/articles', articlesRouter)

export default router
