import cors from 'cors'
import express from 'express'
import unless from 'express-unless'
import helmet from 'helmet'
import { Services } from './types'
import errorHandler from './middleware/errorHandler'
import createTokenParser from './middleware/tokenParser'
import apiRouter from './routes/api/router'
import filesRouter from './routes/file'

const corsOptions = {
	origin: process.env.UI_SERVER || false,
	exposedHeaders: 'content-range',
	credentials: true,
}

const createApp = (services: Services) => {
	const tokenParser = unless(
		createTokenParser(services.token),
		// @ts-ignore: unless supports 2 arguments, but declared to support only 1
		{ path: /(register|login)$/ },
	)
	
	const app = express()
		.use(helmet())
		.use(cors(corsOptions))
		.use(tokenParser)
		.use(express.static('../dist'))
		.use('/api', apiRouter)
		.use('/files', filesRouter)
		.use(errorHandler)
	
	return { ...app, services }
}

export default createApp
