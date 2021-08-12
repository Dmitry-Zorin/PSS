import 'dotenv/config'
import { GridFSBucket } from 'mongodb'
import getClient, { disconnect } from '../src/services/mongo-client'
import { TEST_COLLECTION_NAME } from './helpers'

export const clearDb = async () => {
	const dbClient = await getClient()
	
	const db = dbClient.db(process.env.DB_NAME)
	await db.collection(TEST_COLLECTION_NAME).drop().catch(() => {})
	
	const fileDb = dbClient.db(process.env.FILE_DB_NAME)
	const bucket = new GridFSBucket(fileDb, { bucketName: TEST_COLLECTION_NAME })
	await bucket.drop().catch(() => {})
	
	await disconnect()
}

export default clearDb
