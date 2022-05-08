import { IsDefined } from 'class-validator'
import { ResourceDto } from './params/resource.dto'

export class CreateDto extends ResourceDto {
	@IsDefined()
	payload: any
}
