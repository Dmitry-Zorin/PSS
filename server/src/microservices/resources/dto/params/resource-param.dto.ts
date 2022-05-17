import { IsString, Length } from 'class-validator'

export class ResourceParamDto {
	@IsString()
	@Length(1, 50)
	resource: string
}
