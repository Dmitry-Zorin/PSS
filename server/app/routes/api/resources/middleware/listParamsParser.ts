import { NextFunction, Request, Response } from 'express'
import { forIn, isInteger } from 'lodash'
import { createBadRequestError } from '../../../../../errors'

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

const listParamsParser = (req: Request, res: Response, next: NextFunction) => {
	try {
		forIn(req.query, (value = '', key) => {
			const isValidParam = paramValidations[key]
			if (isValidParam) {
				const parsedValue = JSON.parse(value.toString())
				if (!isValidParam(parsedValue)) {
					throw createBadRequestError(`Invalid ${key} parameter`)
				}
				res.locals[key] = parsedValue
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

export default listParamsParser
