import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

export const VALID_SORT_VALUES = ['ASC', 'DESC', 'asc', 'desc'] as const

@ValidatorConstraint()
export class SortValues implements ValidatorConstraintInterface {
	validate(object: Object, args: ValidationArguments) {
		const values = Object.values(object)
		return values.every(value => VALID_SORT_VALUES.includes(value))
	}

	defaultMessage() {
		return 'Sort values must be either "ASC" or "DESC"'
	}
}
