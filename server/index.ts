import createExpressApp from './src/app/app.express'
import getMongoService from './src/db/db.mongo'
import bcrypt from './src/services/encryption/encryption.bcrypt'
import getGridFsService from './src/services/file/file.gridFs'
import jsonwebtoken from './src/services/token/token.jsonwebtoken'
import { createEnvError } from './src/utils/errors'
import logger from './src/utils/logger'

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
