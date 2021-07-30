import { MongoClient } from 'mongodb'
import { createEnvError } from '../utils/errors'
import logger from '../utils/logger'

const EXIT_SIGNALS = ['SIGINT', 'SIGHUP', 'SIGTERM', 'SIGUSR2']

const { DB_URI } = process.env

if (!DB_URI) {
	throw createEnvError('db_uri')
}

const client = new MongoClient(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const getClient = async () => {
	if (client.isConnected()) return client
	
	logger.start('Connecting to the database...')
	
	await client.connect().catch(err => {
		logger.fail('Connection to the database failed')
		throw err
	})
	
	logger.succeed('Connected to the database')
	
	EXIT_SIGNALS.forEach(signal => {
		process.on(signal, async (code) => {
			await client.close()
			process.exit(code)
		})
	})
	
	return client
}

export default getClient
