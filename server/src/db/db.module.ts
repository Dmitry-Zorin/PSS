import { Module } from '@nestjs/common'
import { DbService } from './db.service'
import { MongoModule } from './mongo/mongo.module'

@Module({
	imports: [ MongoModule ],
	exports: [ DbService ],
})
export class DbModule {}
