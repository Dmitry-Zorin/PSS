import { IsString, Length } from 'class-validator'

export class ResourceDto {
	@IsString()
	@Length(1, 50)
	resource: string
}
