import { IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class CreateDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@IsDefined()
	payload: any
}
