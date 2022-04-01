import { IsNotEmpty, IsString } from 'class-validator'

export class RemoveResourceDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@IsString()
	@IsNotEmpty()
	id: string
}
