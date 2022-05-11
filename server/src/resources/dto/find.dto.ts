import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsIn, IsInt, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, IsUUID, Max, Min, Validate, ValidateNested } from 'class-validator'
import { FilterValues } from './filter-values'
import { IdsDto } from './params/ids.dto'
import { ResourceDto } from './params/resource.dto'

const VALID_SORT_VALUES = ['ASC', 'DESC', 'asc', 'desc'] as const

class Sort {
	@IsString()
	@IsNotEmpty()
	field: string

	@IsIn(VALID_SORT_VALUES)
	order: typeof VALID_SORT_VALUES[number]
}

export class FindListParamsDto {
	@IsOptional()
	@IsObject()
	@Validate(FilterValues)
	filter?: Record<string, any>

	@IsOptional()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => Sort)
	sort?: Sort

	@IsOptional()
	@IsInt()
	@Min(0)
	skip?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(100)
	take?: number = 100
}

class FindQueryDto extends IntersectionType(
	PartialType(IdsDto),
	FindListParamsDto,
) {}

export class FindDto extends ResourceDto {
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => FindQueryDto)
	query: FindQueryDto
}
