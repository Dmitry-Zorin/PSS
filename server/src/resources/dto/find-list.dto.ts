import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Max, Min, Validate, ValidateNested, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export interface ListParams extends ListParamsDto {}

const VALID_SORT_VALUES = ['ASC', 'DESC', 'asc', 'desc'] as const

@ValidatorConstraint()
class SortValues implements ValidatorConstraintInterface {
	validate(object: Object, args: ValidationArguments) {
		const values = Object.values(object)
		return values.every(value => VALID_SORT_VALUES.includes(value))
	}

	defaultMessage() {
		return 'Sort values must be either "ASC" or "DESC"'
	}
}

class ListParamsDto {
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

export class FindListDto {
	@IsString()
	@IsNotEmpty()
	resource: string

	@ValidateNested()
	@Type(() => ListParamsDto)
	query: ListParamsDto
}
