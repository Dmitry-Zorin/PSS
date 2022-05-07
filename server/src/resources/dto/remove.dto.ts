import { IsNotEmpty, IsString } from 'class-validator'

export class RemoveDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@IsString()
	@IsNotEmpty()
	id: string
}
