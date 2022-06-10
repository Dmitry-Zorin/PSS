import { Type } from 'class-transformer'
import {
	IsNotEmptyObject,
	IsOptional,
	IsString,
	MaxLength,
	ValidateNested,
} from 'class-validator'
import { PublicationDto } from './publication.dto'

export class ResourceItemDto {
	@IsString()
	@MaxLength(200)
	title: string

	@IsOptional()
	@IsString()
	@MaxLength(5000)
	description?: string

	@IsOptional()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PublicationDto)
	publication?: PublicationDto
}
