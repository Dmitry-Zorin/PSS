import chalk from 'chalk'
import mongodb from 'mongodb'
import './env.js'
import logger from './logger.js'

const { DB_URI, DB_NAME, FILE_DB_NAME } = process.env

const client = new mongodb.MongoClient(DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

export let db
export let fileDb

try {
	logger.start('Connecting to the database...')
	await client.connect()
	
	db = client.db(DB_NAME)
	fileDb = client.db(FILE_DB_NAME)
	
	await db.command({ ping: 1 })
	logger.succeed(`Successfully connected to database ${chalk.blue(DB_NAME)}`)
}
catch (err) {
	logger.fail('Connection to the database failed')
	console.error(err)
}

export default client

export const { ObjectId, GridFSBucket } = mongodb
