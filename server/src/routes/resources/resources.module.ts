import { Module } from '@nestjs/common'
import { DbModule } from '../../db/db.module'
import { ResourcesController } from './resources.controller'

@Module({
	imports: [ DbModule ],
	controllers: [ ResourcesController ],
})
export class ResourcesModule {}
