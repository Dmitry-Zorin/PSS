import { MongoClient } from 'mongodb'
import { createEnvError } from '../helpers/errors'

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

export default client
