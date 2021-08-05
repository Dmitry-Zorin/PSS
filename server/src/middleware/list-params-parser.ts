import { isInteger, reduce } from 'lodash'
import { createBadRequestError } from '../helpers/errors'
import { createSafeHandler } from './create-safe-handler'

const paramValidations: Record<string, ((x: any) => boolean) | undefined> = {
	match: (param: any) => (
		toString.call(param) === '[object Object]'
	),
	sort: (param: any) => (
		toString.call(param) === '[object Object]'
		&& [-1, 1].includes(Object.values(param)?.[0] as number)
	),
	skip: (param: any) => (
		isInteger(param) && param >= 0
	),
	limit: (param: any) => (
		isInteger(param) && param >= 0
	),
}

const parseParamValue = (value: any) => {
	try {
		return JSON.parse(value)
	}
	catch (err) {
		throw createBadRequestError('Invalid format of query parameters')
	}
}

const reduceCallback = (params: Record<string, any>, value: any, key: string) => {
	const validateParam = paramValidations[key]
	
	if (validateParam) {
		const parsedValue = parseParamValue(value)
		if (!validateParam(parsedValue)) {
			throw createBadRequestError(`Invalid ${key} parameter`)
		}
		params[key] = parsedValue
	}
	
	return params
}

export const listParamsParser = createSafeHandler((req, res, next) => {
	res.locals.listParams = reduce(req.query, reduceCallback, {} as Record<string, any>)
	next()
})
