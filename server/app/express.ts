import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import errorHandler from './middleware/errorHandler'
import apiRouter from './routes/api/router'
import filesRouter from './routes/file'
import { DbService } from '../db/types'

const corsOptions = {
	origin: process.env.UI_SERVER || false,
	exposedHeaders: 'content-range',
	credentials: true,
}

const createApp = (dbService: DbService) => {
	const app = express()
		.use(helmet())
		.use(cors(corsOptions))
		.use(express.static('../dist'))
		.use('/api', apiRouter)
		.use('/files', filesRouter)
		.use(errorHandler)
	
	app.dbService = dbService
	app.fileService = dbService.fileService
	
	return app
}

export default createApp
