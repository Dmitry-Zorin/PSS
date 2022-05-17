import { Module } from '@nestjs/common'
import { OtherResourcesService } from './otherResources.service'

@Module({
	providers: [OtherResourcesService],
	exports: [OtherResourcesService],
})
export class OtherResourcesModule {}
