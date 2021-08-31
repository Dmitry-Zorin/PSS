import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isInteger, transform } from 'lodash'
import { PaginationOptions } from './db/mongo/pipelines/pagination'

@Injectable()
export class ListParamsPipe implements PipeTransform {
	private static isListParam(param: string): param is keyof PaginationOptions {
		return param in paramValidations
	}

	transform(data: any, metadata: ArgumentMetadata): PaginationOptions {
		return transform(data.query as Record<string, string>, (params, value, key) => {
			if (!ListParamsPipe.isListParam(key)) return

			const parsedValue = parseParamValue(value)

			if (!paramValidations[key](parsedValue)) {
				throw new BadRequestException(`Invalid ${key} parameter`)
			}

			params[key] = parsedValue
		})
	}
}

const isObject = (param: any) => (
	toString.call(param) === '[object Object]'
)

const isNonNegativeInteger = (param: any) => (
	isInteger(param) && param >= 0
)

const paramValidations: Record<keyof PaginationOptions, (x: any) => boolean> = {
	match: isObject,
	sort: (param) => (
		isObject(param)
		&& Math.abs(Object.values(param)?.[0] as number) === 1
	),
	skip: isNonNegativeInteger,
	limit: isNonNegativeInteger,
}

const parseParamValue = (value: any) => {
	try {
		return JSON.parse(value)
	}
	catch (err) {
		throw new BadRequestException('Invalid format of query parameters')
	}
}
