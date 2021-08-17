import 'dotenv/config'
import { GridFSBucket } from 'mongodb'
import client from '../src/services/mongo-client'
import { TEST_COLLECTION_NAME } from './helpers'

export const clearDb = async () => {
	await client.connect()
	
	const db = client.db(process.env.DB_NAME)
	await db.collection(TEST_COLLECTION_NAME).drop().catch(() => {})
	
	const fileDb = client.db(process.env.FILE_DB_NAME)
	const bucket = new GridFSBucket(fileDb, { bucketName: TEST_COLLECTION_NAME })
	await bucket.drop().catch(() => {})
	
	await client.close()
}

export default clearDb
