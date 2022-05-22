import { Type } from 'class-transformer'
import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	Max,
	MaxLength,
	Min,
} from 'class-validator'

export class PublicationDto {
	@IsOptional()
	@IsString()
	@Length(1, 100)
	type?: string

	@IsOptional()
	@IsUUID()
	@Type(() => Number)
	characterId?: number

	@IsOptional()
	@IsInt()
	@Min(1900)
	@Max(2100)
	@Type(() => Number)
	year?: number

	@IsOptional()
	@IsString()
	@Length(1, 5000)
	outputData?: string

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(5000)
	@Type(() => Number)
	volume: number

	@IsArray()
	@IsUUID(undefined, { each: true })
	authorIds: string[]

	@IsOptional()
	@IsString({ each: true })
	@IsNotEmpty({ each: true })
	@MaxLength(100, { each: true })
	coauthors?: string[]
}
