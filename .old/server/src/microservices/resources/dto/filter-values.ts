import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint()
export class FilterValues implements ValidatorConstraintInterface {
	validate(object: Record<string, any>) {
		const values = Object.values(object)
		return values.every((value) => ['string', 'number'].includes(typeof value))
	}

	defaultMessage() {
		return 'Filter values must be either string or number'
	}
}
