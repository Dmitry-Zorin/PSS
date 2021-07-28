import { NextFunction, Request, Response, Router } from 'express'
import adminChecker from '../../../middleware/adminChecker'
import fileParser from '../../../middleware/fileParser'
import listParamsParser from './middleware/listParamsParser'
import { createNotFoundError } from '../../../../errors'
import fs from 'fs'
import path from 'path'
import appRoot from 'app-root-path'

import { create, getList, getOne, remove, update } from './handlers'
import errorCatcher from '../../../middleware/errorCatcher'

const files = fs.readdirSync(appRoot.resolve('db/projections'))

const projections = Object.fromEntries(files.map((file) => (
	[path.parse(file).name, appRoot.require(`db/projections/${file}`)]
)))

const projectionProvider = (req: Request, res: Response, next: NextFunction, resource: string) => {
	const resourceProjection = projections[resource]
	
	if (!resourceProjection) {
		return next(createNotFoundError('Resource not found'))
	}
	
	res.locals.projection = {
		...resourceProjection,
		_id: 0,
		id: '$_id',
		createdAt: { $toDate: '$_id' },
	}
	next()
}

const resourceRouter = Router({ mergeParams: true })
	.param('resource', projectionProvider)
	.get('/:resource', listParamsParser, errorCatcher(getList))
	.get('/:resource/:id', errorCatcher(getOne))
	.use(adminChecker)
	.post('/:resource', fileParser, errorCatcher(create))
	.put('/:resource/:id', fileParser, errorCatcher(update))
	.delete('/:resource/:id', errorCatcher(remove))

export default resourceRouter
