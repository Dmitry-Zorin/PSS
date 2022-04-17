import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator'

export class ResourceDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsOptional()
	@Length(1, 10000)
	description?: string

	@IsOptional()
	@Length(1, 100)
	type?: string

	@IsOptional()
	@IsInt()
	@Min(1900)
	@Max(2100)
	year?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(1000)
	volume?: number

	@IsDefined()
	@MaxLength(50, { each: true })
	authors: string[]

	@IsOptional()
	@Length(1, 100)
	character?: string

	@IsOptional()
	@Length(1, 10000)
	exitData?: string
}
