import { Router } from 'express'
import * as fs from 'fs'
import * as path from 'path'
import adminChecker from '../../../middleware/adminChecker'
import errorCatcher from '../../../middleware/errorCatcher'
import fileParser from '../../../middleware/fileParser'
import { create, getList, getOne, Projections, remove, setProjection, update } from './handlers'
import listParamsParser from './middleware/listParamsParser'

const projectionsPath = '../../../../db/projections'

const files = fs.readdirSync(path.resolve(__dirname, projectionsPath))
	.filter(e => /[jt]s$/.test(e))

const projections: Projections = Object.fromEntries(files.map(file => (
	[path.parse(file).name, require(`${projectionsPath}/${file}`)]),
))

const resourceRouter = Router({ mergeParams: true })
	.param('resource', setProjection(projections))
	.get('/:resource', listParamsParser, errorCatcher(getList))
	.get('/:resource/:id', errorCatcher(getOne))
	.use(adminChecker)
	.post('/:resource', fileParser, errorCatcher(create))
	.put('/:resource/:id', fileParser, errorCatcher(update))
	.delete('/:resource/:id', errorCatcher(remove))

export default resourceRouter
