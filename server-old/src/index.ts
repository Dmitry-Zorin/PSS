import Express from './express'
import { EnvError } from './helpers/errors'
import logger from './helpers/logger'
import bcrypt from './services/bcrypt'
import GridFs from './services/gridfs'
import jsonwebtoken from './services/jsonwebtoken'
import Mongo from './services/mongo'
import client from './services/mongo-client'

const { SERVER } = process.env

if (!SERVER) {
	throw EnvError('server')
}

logger.start('Connecting to the database...')
const promise = client.connect()

promise.then(async () => {
	const app = Express({
		db: await Mongo(),
		fs: await GridFs(),
		jwt: jsonwebtoken,
		crypt: bcrypt,
	})
	const { port, hostname } = new URL(SERVER)
	app.listen(+port, hostname, () => {
		logger.succeed('Server is running')
	})
})

promise.catch(err => {
	logger.fail('Connection to the database failed')
	throw err
})
