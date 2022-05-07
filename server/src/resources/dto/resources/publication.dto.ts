import { IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, MaxLength, Min } from 'class-validator'

export class PublicationDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsOptional()
	@Length(1, 100)
	type?: string

	@IsOptional()
	@IsInt()
	@Min(0)
	characterId?: number

	@IsOptional()
	@IsInt()
	@Min(1900)
	@Max(2100)
	year?: number

	@IsOptional()
	@Length(1, 10000)
	outputData?: string

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(1000)
	volume?: number

	@IsDefined()
	@MaxLength(20, { each: true })
	authorIds: string[]

	@IsOptional()
	@MaxLength(30, { each: true })
	coauthors: string[]
}
