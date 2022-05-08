import { IntersectionType } from '@nestjs/mapped-types'
import { CreateDto } from './create.dto'
import { IdDto } from './params/id.dto'

export class UpdateDto extends IntersectionType(CreateDto, IdDto) {}
