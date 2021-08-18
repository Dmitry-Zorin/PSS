import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ClientModule } from './client.module'
import { MongoService } from './mongo.service'
import { ProjectionsService } from './projections.service'

@Module({
	imports: [ ConfigModule, ClientModule ],
	providers: [ ProjectionsService, MongoService ],
	exports: [ MongoService ],
})
export class MongoModule {}
