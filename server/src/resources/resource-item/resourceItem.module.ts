import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ResourceItem } from '../entities'
import { ResourceItemService } from './resourceItem.service'

@Module({
	imports: [TypeOrmModule.forFeature([ResourceItem], 'resourcesConnection')],
	providers: [ResourceItemService],
	exports: [ResourceItemService],
})
export class ResourceItemModule {}
