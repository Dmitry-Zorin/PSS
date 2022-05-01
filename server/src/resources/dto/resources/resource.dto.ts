import { IsIn, IsNotEmpty, IsString } from 'class-validator'

export class ResourceDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsIn(['A', 'B', 'C'])
	category: string
}
