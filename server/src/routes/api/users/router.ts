import { Router } from 'express'
import { checkIfAdmin, createSafeHandler } from '../../../middleware'
import { create, getOne, remove, update } from './handlers'

const userRouter = Router({ mergeParams: true })
	.use(checkIfAdmin)
	.post('/', createSafeHandler(create))
	//.get('/', listParamsParser, createSafeHandler(getList))
	.get('/:id', createSafeHandler(getOne))
	.put('/:id', createSafeHandler(update))
	.delete('/:id', createSafeHandler(remove))

export default userRouter
