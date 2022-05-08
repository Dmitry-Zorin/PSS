import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class ResourceDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	name: string

	@IsIn(['A', 'B', 'C'])
	category: string
}
