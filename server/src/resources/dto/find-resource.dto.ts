import { IsNotEmpty, IsString } from 'class-validator'

export class FindResourceDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@IsString()
	@IsNotEmpty()
	id: string
}
