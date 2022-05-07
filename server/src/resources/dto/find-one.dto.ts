import { IsNotEmpty, IsString } from 'class-validator'

export class FindOneDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@IsString()
	@IsNotEmpty()
	id: string
}
