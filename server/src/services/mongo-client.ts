import { memoize } from 'lodash'
import { MongoClient } from 'mongodb'
import { createEnvError } from '../helpers/errors'
import logger from '../helpers/logger'

const EXIT_SIGNALS = ['SIGINT', 'SIGHUP', 'SIGTERM', 'SIGUSR2']

const { DB_URI } = process.env

if (!DB_URI) {
	throw createEnvError('db_uri')
}

const client = new MongoClient(DB_URI)

EXIT_SIGNALS.forEach(signal => {
	process.on(signal, async (code) => {
		await client.close()
		process.exit(code)
	})
})

export const disconnect = async () => {
	await client.close()
	logger.succeed('Disconnected from the database')
}

const getClient = memoize(async () => {
	logger.start('Connecting to the database...')
	await client.connect().catch(err => {
		logger.fail('Connection to the database failed')
		throw err
	})
	logger.succeed('Connected to the database')
	return client
})

export default getClient
