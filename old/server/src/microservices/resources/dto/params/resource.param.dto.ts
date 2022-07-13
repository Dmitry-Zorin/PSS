import { IsString, MaxLength } from 'class-validator'

export class ResourceParamDto {
	@IsString()
	@MaxLength(50)
	resource: string
}
