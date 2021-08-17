import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongoClient } from 'mongodb'
import logger from '../logger'

const clientFactory = {
	provide: 'DB_CLIENT',
	useFactory: async (config: ConfigService) => {
		const client = new MongoClient(config.get('DB_URI')!)
		logger.start('Connecting to the database...')
		await client.connect().catch(err => {
			logger.fail('Connection to the database failed')
			throw err
		})
		logger.succeed('Connected to the database')
		return client
	},
	inject: [ ConfigService ],
}

@Module({
	imports: [ ConfigModule ],
	providers: [ clientFactory ],
	exports: [ clientFactory ],
})
export class DbClientModule {}
