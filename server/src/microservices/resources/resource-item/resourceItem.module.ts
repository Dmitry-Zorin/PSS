import { Module } from '@nestjs/common'
import { ResourceItemService } from './resourceItem.service'

@Module({
	providers: [ResourceItemService],
	exports: [ResourceItemService],
})
export class ResourceItemModule {}
