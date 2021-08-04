import 'dotenv/config'
import getClient, { disconnect } from '../src/services/mongo-client'
import { TEST_COLLECTION_NAME } from './helpers'

export const clearDb = async () => {
	const dbClient = await getClient()
	const db = dbClient.db(process.env.DB_NAME)
	const fileDb = dbClient.db(process.env.FILE_DB_NAME)
	await Promise.all([
		db.collection(TEST_COLLECTION_NAME).drop(),
		fileDb.collection(`${TEST_COLLECTION_NAME}.files`).drop(),
		fileDb.collection(`${TEST_COLLECTION_NAME}.chunks`).drop(),
	])
	await disconnect()
}

export default clearDb
