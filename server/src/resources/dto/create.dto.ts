import { IsNotEmptyObject } from 'class-validator'
import { ResourceDto } from './params/resource.dto'

export class CreateDto extends ResourceDto {
	@IsNotEmptyObject()
	payload: any
}
