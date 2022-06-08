import { Module } from '@nestjs/common'
import { ResourceItemService } from './resource-item.service'

@Module({
	providers: [ResourceItemService],
	exports: [ResourceItemService],
})
export class ResourceItemModule {}
