import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class AuthorDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(15)
	lastName: string

	@IsString()
	@IsNotEmpty()
	@MaxLength(15)
	firstName: string

	@IsOptional()
	@IsString()
	@MaxLength(15)
	middleName: string

	@IsOptional()
	@IsString()
	@MaxLength(10000)
	info: string
}
