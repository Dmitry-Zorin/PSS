const path = require('path')
const appRoot = require('app-root-path')
const express = require('express')
const app = express()
const connectToDb = require('./mongodb')
const cors = require('cors')
const cron = require('node-cron')
const cookieParser = require('cookie-parser')
const { auth } = require('./auth')
const { updateEmployees } = require('./redmine')

const isDevelopment = process.env.NODE_ENV === 'development'

require('dotenv').config({
	path: path.join(appRoot.path, `.env.${isDevelopment ? 'dev' : 'prod'}`),
})

if (isDevelopment) {
	app.use(cors({
		origin: process.env.UI_SERVER,
		exposedHeaders: 'Content-Range',
		credentials: true,
	}))
}

app.use(express.static(path.join(appRoot.path, 'dist')))

app.use('/media', express.static(path.join(appRoot.path, 'media')))

app.use((req, res, next) => {
	res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
	res.header('Pragma', 'no-cache')
	res.header('Expires', '0')
	next()
})

require('./routes/UserAPI').login(app)

app.use(cookieParser())

app.use(auth)

require('./loader')(app)

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.sendStatus(500)
})

connectToDb
	.then(() => {
		const url = new URL(process.env.SERVER)
		app.listen(+url.port, url.hostname, () => {
			console.log('Server is running...')
			//updateEmployees()
			cron.schedule('0 0 * * Mon', updateEmployees)
		})
	})
	.catch(console.log)
