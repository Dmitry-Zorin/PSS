import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OtherResourcesService } from './otherResources.service'

const { availableEntities } = OtherResourcesService

const entities = Object.values(availableEntities)

@Module({
	imports: [TypeOrmModule.forFeature(entities, 'resourcesConnection')],
	providers: [OtherResourcesService],
	exports: [OtherResourcesService],
})
export class OtherResourcesModule {}
