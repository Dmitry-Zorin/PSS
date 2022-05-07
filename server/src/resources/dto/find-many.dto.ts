import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

class IdsDto {
	@IsArray()
	@ArrayNotEmpty()
	ids: string[]
}

export class FindManyDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@ValidateNested()
	@Type(() => IdsDto)
	query: IdsDto
}
