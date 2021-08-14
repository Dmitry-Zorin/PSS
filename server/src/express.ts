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

const App = (services: Services) => {
	const app = express()
		.use(helmet())
		.use(cors(corsOptions))
		.use('/api', apiRouter)
		.use('/files', fileRouter)
		.use(errorHandler())
	
	app.services = services
	return app
}

export default App
