import { IsArray, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Max, MaxLength, Min } from 'class-validator'

export class PublicationDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsOptional()
	@IsString()
	@Length(1, 100)
	type?: string

	@IsOptional()
	@IsUUID()
	characterId?: number

	@IsOptional()
	@IsInt()
	@Min(1900)
	@Max(2100)
	year?: number

	@IsOptional()
	@IsString()
	@Length(1, 10000)
	outputData?: string

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(1000)
	volume?: number

	@IsDefined()
	@IsArray()
	@IsUUID(undefined, { each: true })
	authorIds: string[]

	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@MaxLength(50, { each: true })
	coauthors: string[]
}
