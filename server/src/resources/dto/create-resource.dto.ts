import { IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class CreateResourceDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@IsDefined()
	payload: any
}
