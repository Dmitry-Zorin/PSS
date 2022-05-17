import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CONNECTION_NAME } from '../constants'
import { Publication, ResourceItem } from '../entities'
import { ResourceItemService } from './resourceItem.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ResourceItem,
			Publication,
		], CONNECTION_NAME),
	],
	providers: [ResourceItemService],
	exports: [ResourceItemService],
})
export class ResourceItemModule {}
