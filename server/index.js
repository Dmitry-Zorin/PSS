import appRoot from 'app-root-path'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import './dotenv.js'
import errorHandler from './middleware/errorHandler.js'
import connectToDb from './mongodb.js'
import router from './routers/router.js'

const app = express()

app.use(helmet())

app.use(express.static(appRoot.resolve('../dist')))

app.use('/media', express.static(appRoot.resolve('../media')))

app.use(cors({
	origin: process.env.UI_SERVER || false,
	exposedHeaders: 'Content-Range',
	credentials: true,
}))

app.use('/api', router)

app.use(errorHandler)

connectToDb()
	.then(() => {
		const url = new URL(process.env.SERVER)
		app.listen(+url.port, url.hostname, () => {
			console.log('Server is running...')
			//cron.schedule('0 0 * * Mon', updateEmployees)
		})
	})
	.catch(console.log)
