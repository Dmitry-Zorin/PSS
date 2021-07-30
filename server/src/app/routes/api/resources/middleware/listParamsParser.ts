import { NextFunction, Request, Response } from 'express'
import { isInteger, reduce } from 'lodash'
import { createBadRequestError } from '../../../../../utils/errors'

type ListParamsKey = 'match' | 'sort' | 'skip' | 'limit'

interface ListParams {
	match: any,
	sort: any,
	skip: number,
	limit: number
}

const paramValidations: Record<ListParamsKey, ((x: any) => boolean) | undefined> = {
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

const listParamsParser = (req: Request, res: Response, next: NextFunction) => {
	try {
		res.locals.listParams = reduce(req.query, (params, value, key) => {
			const isValidParam = paramValidations[key as ListParamsKey]
			if (isValidParam) {
				const parsedValue = JSON.parse(value as string)
				if (!isValidParam(parsedValue)) {
					throw createBadRequestError(`Invalid ${key} parameter`)
				}
				params[key as ListParamsKey] = parsedValue
			}
			return params
		}, {} as ListParams)
	}
	catch (err) {
		return next(err.name === 'BadRequestError' ? err : (
			createBadRequestError('Invalid format of query parameters')
		))
	}
	next()
}

export default listParamsParser
