import { NextFunction, Request, Response } from 'express'
import { forIn, isInteger } from 'lodash'
import { createBadRequestError } from '../errors'

const paramValidations: Record<string, ((x: any) => boolean) | undefined> = {
	'match': (param: any) => (
		toString.call(param) === '[object Object]'
	),
	'sort': (param: any) => (
		toString.call(param) === '[object Object]'
		// && [-1, 1].includes(Object.values(param)[0])
	),
	'skip': (param: any) => (
		isInteger(param) && param >= 0
	),
	'limit': (param: any) => (
		isInteger(param) && param >= 0
	),
}

const listParamsChecker = (req: Request, res: Response, next: NextFunction) => {
	try {
		forIn(req.query, (value = '', key) => {
			const isValidParam = paramValidations[key]
			if (isValidParam && !isValidParam(JSON.parse(value.toString()))) {
				throw createBadRequestError(`Invalid ${key} parameter`)
			}
		})
	}
	catch (err) {
		return next(err.name === 'BadRequestError' ? err : (
			createBadRequestError('Invalid format of query parameters')
		))
	}
	
	next()
}

export default listParamsChecker
