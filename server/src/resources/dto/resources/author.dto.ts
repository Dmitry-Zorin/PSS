import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AuthorDto {
	@IsString()
	@IsNotEmpty()
	lastName: string

	@IsString()
	@IsNotEmpty()
	firstName: string

	@IsOptional()
	@IsString()
	middleName: string

	@IsOptional()
	@IsString()
	info: string
}
