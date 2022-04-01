import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, MaxLength, Min, ValidateNested } from 'class-validator'

class ResourceDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsOptional()
	@Length(1, 1000)
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

	@MaxLength(10, { each: true })
	authors: string[]

	@IsOptional()
	@Length(1, 100)
	character?: string

	@IsOptional()
	@Length(1, 1000)
	exitData?: string
}

export class CreateResourceDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@ValidateNested()
	@Type(() => ResourceDto)
	payload: ResourceDto
}
