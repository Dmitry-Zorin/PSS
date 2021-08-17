import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DbClientModule } from './db-client.module'
import { DbService } from './db.service'

@Module({
	imports: [ ConfigModule, DbClientModule ],
	providers: [ DbService ],
	exports: [ DbService ],
})
export class DbModule {}
