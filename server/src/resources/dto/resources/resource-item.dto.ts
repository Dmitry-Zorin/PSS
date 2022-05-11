import { Type } from 'class-transformer'
import { IsMongoId, IsNotEmptyObject, IsOptional, IsString, Length, ValidateNested } from 'class-validator'
import { PublicationDto } from './publication.dto'

export class FileDto {
	@IsMongoId()
	fileId: string

	@IsString()
	@Length(1, 200)
	name: string
}

export class ResourceItemDto {
	@IsString()
	@Length(1, 200)
	title: string

	@IsOptional()
	@IsString()
	@Length(1, 5000)
	description?: string

	@IsOptional()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PublicationDto)
	publication?: PublicationDto

	@IsOptional()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => FileDto)
	file?: FileDto
}
