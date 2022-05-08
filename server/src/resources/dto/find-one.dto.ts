import { IntersectionType } from '@nestjs/mapped-types'
import { IdDto } from './params/id.dto'
import { ResourceDto } from './params/resource.dto'

export class FindOneDto extends IntersectionType(ResourceDto, IdDto) {}
