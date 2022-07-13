import { Type } from 'class-transformer'
import {
	IsArray,
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	Max,
	MaxLength,
	Min,
	ValidateIf,
} from 'class-validator'

export class PublicationDto {
	@IsOptional()
	@IsString()
	@MaxLength(100)
	type?: string

	@IsOptional()
	@ValidateIf((_, value) => value !== '')
	@IsUUID()
	characterId?: string

	@IsOptional()
	@ValidateIf((_, value) => value !== null)
	@IsInt()
	@Min(1900)
	@Max(2100)
	@Type(() => Number)
	year?: number

	@IsOptional()
	@IsString()
	@MaxLength(5000)
	outputData?: string

	@IsOptional()
	@ValidateIf((_, value) => value !== null)
	@IsInt()
	@Min(0)
	@Max(5000)
	@Type(() => Number)
	volume: number

	@IsArray()
	@IsUUID('all', { each: true })
	authorIds: string[]

	@IsOptional()
	@IsString({ each: true })
	@Length(1, 100, { each: true })
	coauthors?: string[]
}
