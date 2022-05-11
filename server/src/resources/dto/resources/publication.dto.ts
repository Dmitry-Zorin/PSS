import { IsArray, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Max, MaxLength, Min } from 'class-validator'

export class PublicationDto {
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
	@Length(1, 5000)
	outputData?: string

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(5000)
	volume?: number

	@IsDefined()
	@IsArray()
	@IsUUID(undefined, { each: true })
	authorIds: string[]

	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@MaxLength(100, { each: true })
	coauthors: string[]
}
