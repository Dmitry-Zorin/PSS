import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { errorHandler } from './middleware'
import apiRouter from './routers/api'
import fileRouter from './routers/file'
import { Services } from './types'

const corsOptions = {
	origin: process.env.UI_SERVER || false,
	exposedHeaders: 'content-range',
	credentials: true,
}

const createApp = (services: Services) => {
	const app = express()
	app.services = services
	return app
		.use(helmet())
		.use(cors(corsOptions))
		.use('/api', apiRouter)
		.use('/files', fileRouter)
		.use(errorHandler())
}

export default createApp
