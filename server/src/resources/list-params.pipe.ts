import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isInteger, isNumber, isString, transform } from 'lodash'

export interface PaginationOptions {
	match?: Record<string, unknown>,
	sort?: Record<string, 'asc' | 'desc' | 1 | -1>,
	skip?: number,
	limit: number,
}

const DEFAULT_OPTIONS: PaginationOptions = {
	limit: 25
}

@Injectable()
export class ListParamsPipe implements PipeTransform {
	private static isListParam(param: string): param is keyof PaginationOptions {
		return param in paramValidations
	}

	transform(data: any, metadata: ArgumentMetadata): PaginationOptions {
		return transform(data.query as Record<string, string>, (params, value, key) => {
			if (!ListParamsPipe.isListParam(key)) return

			let parsedValue

			try {
				parsedValue = JSON.parse(value)
			}
			catch {
				throw new BadRequestException(`Invalid format of the ${key} parameter`)
			}

			if (!paramValidations[key](parsedValue)) {
				throw new BadRequestException(`Invalid ${key} parameter`)
			}

			params[key] = parsedValue
		}, DEFAULT_OPTIONS)
	}
}

const isObject = (param: unknown): param is Record<string, unknown> => (
	toString.call(param) === '[object Object]'
)

const isNonNegativeInteger = (param: unknown): param is number => (
	isInteger(param) && (param as number) >= 0
)

const paramValidations: Record<keyof PaginationOptions, (x: unknown) => boolean> = {
	match: isObject,
	sort: (param) => {
		if (!isObject(param)) {
			return false
		}
		const value = Object.values(param)[0]
		return (
			isString(value) && /^(asc|desc|1|-1)$/i.test(value)
			|| isNumber(value) && [-1, 1].includes(value)
		)
	},
	skip: isNonNegativeInteger,
	limit: isNonNegativeInteger,
}
