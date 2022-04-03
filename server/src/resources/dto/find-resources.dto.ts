import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

class PaginationOptionsDto {
	@IsOptional()
	match?: Record<string, unknown>

	@IsOptional()
	sort?: Record<string, string>

	@IsOptional()
	skip?: number

	@IsOptional()
	limit?: number
}

export class FindResourcesDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@ValidateNested()
	@Type(() => PaginationOptionsDto)
	query: PaginationOptionsDto
}
