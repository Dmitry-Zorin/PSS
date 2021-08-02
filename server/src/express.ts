import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { handleError, tokenParser } from './middleware'
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
		.use(helmet())
		.use(cors(corsOptions))
		.use(tokenParser(services.token, { path: /(register|login)$/ }))
		.use(express.static('../dist'))
		.use('/api', apiRouter)
		.use('/files', fileRouter)
		.use(handleError)
	
	app.services = services
	
	return app
}

export default createApp
