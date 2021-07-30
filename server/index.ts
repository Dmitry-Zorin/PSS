import createExpressApp from './app/app.express'
import getMongoService from './db/db.mongo'
import bcrypt from './services/encryption/encryption.bcrypt'
import getGridFsService from './services/file/file.gridFs'
import jsonwebtoken from './services/token/token.jsonwebtoken'
import { createEnvError } from './utils/errors'
import logger from './utils/logger'

const { SERVER } = process.env

if (!SERVER) {
	throw createEnvError('server')
}

const { port, hostname } = new URL(SERVER)

getGridFsService().then(async (gridFs) => {
	const mongo = await getMongoService(gridFs)
	const app = createExpressApp({
		db: mongo,
		file: gridFs,
		token: jsonwebtoken,
		encryption: bcrypt,
	})
	app.listen(+port, hostname, () => {
		logger.succeed('Server is running')
	})
})
