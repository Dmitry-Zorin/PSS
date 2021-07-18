import appRoot from 'app-root-path'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import errorHandler from './middleware/errorHandler.js'
import apiRouter from './routers/api.js'
import filesRouter from './routers/files.js'

const app = express()

app.use(helmet())
app.use(cors({
	origin: process.env.UI_SERVER || false,
	exposedHeaders: 'Content-Range',
	credentials: true,
}))
app.use(express.static(appRoot.resolve('../dist')))
app.use('/media', express.static(appRoot.resolve('../media')))
app.use('/api', apiRouter)
app.use('/files', filesRouter)
app.use(errorHandler)

export default app
