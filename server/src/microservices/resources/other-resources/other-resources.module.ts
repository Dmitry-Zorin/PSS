import { Module } from '@nestjs/common'
import { OtherResourcesService } from './other-resources.service'

@Module({
	providers: [OtherResourcesService],
	exports: [OtherResourcesService],
})
export class OtherResourcesModule {}
