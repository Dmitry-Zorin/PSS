import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsInt, IsObject, IsOptional, Max, Min, Validate, ValidateNested } from 'class-validator'
import { SortValues, VALID_SORT_VALUES } from './constraints/sort-values'
import { IdsDto } from './params/ids.dto'
import { ResourceDto } from './params/resource.dto'

export class FindListParamsDto {
	@IsOptional()
	@IsObject()
	match?: Record<string, unknown>

	@IsOptional()
	@IsObject()
	@Validate(SortValues)
	sort?: Record<string, typeof VALID_SORT_VALUES[number]>

	@IsOptional()
	@IsInt()
	@Min(0)
	skip?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(100)
	limit = 10
}

class FindQueryDto extends IntersectionType(
	PartialType(IdsDto),
	FindListParamsDto,
) {}

export class FindDto extends ResourceDto {
	@ValidateNested()
	@Type(() => FindQueryDto)
	query: FindQueryDto
}
