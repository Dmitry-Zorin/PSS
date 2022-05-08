import { IsNotEmpty, IsString } from 'class-validator'

export class ResourceDto {
	@IsString()
	@IsNotEmpty()
	resource: string
}
