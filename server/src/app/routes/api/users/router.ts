import { Router } from 'express'
import adminChecker from '../../../middleware/adminChecker'
import errorCatcher from '../../../middleware/errorCatcher'
import { getList } from '../resources/handlers'
import listParamsParser from '../resources/middleware/listParamsParser'
import { create, getOne, remove, update } from './handlers'

const userRouter = Router({ mergeParams: true })
	.use(adminChecker)
	.post('/', errorCatcher(create))
	.get('/', listParamsParser, errorCatcher(getList))
	.get('/:id', errorCatcher(getOne))
	.put('/:id', errorCatcher(update))
	.delete('/:id', errorCatcher(remove))

export default userRouter
