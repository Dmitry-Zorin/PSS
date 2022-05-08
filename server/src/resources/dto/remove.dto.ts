import { IntersectionType } from '@nestjs/mapped-types'
import { IdsDto } from './params/ids.dto'
import { ResourceDto } from './params/resource.dto'

export class RemoveDto extends IntersectionType(ResourceDto, IdsDto) {}
