import createExpressApp from './express'
import bcrypt from './services/bcrypt'
import gridFs from './services/gridfs'
import jsonwebtoken from './services/jsonwebtoken'
import mongo from './services/mongo'
import { createEnvError } from './utils/errors'
import logger from './utils/logger'

const { SERVER } = process.env

if (!SERVER) {
	throw createEnvError('server')
}

const createApp = async () => (
	createExpressApp({
		db: await mongo(),
		file: await gridFs(),
		token: jsonwebtoken,
		encryption: bcrypt,
	})
)

createApp().then(app => {
	const { port, hostname } = new URL(SERVER)
	app.listen(+port, hostname, () => {
		logger.succeed('Server is running')
	})
})
