import { NextFunction, Request, Response } from 'express'
import { forIn, isInteger, isString, size } from 'lodash'
import { BadRequestError } from '../errors'

interface SearchParams {
	match?: { [key: string]: string },
	sort?: { [key: string]: -1 | 1 },
	skip?: number,
	limit?: number
}

export default (req: Request, res: Response, next: NextFunction) => {
	const searchParams: SearchParams = {}
	
	try {
		forIn(req.query, (value, key) => {
			
			// @ts-ignore
			const parsed = JSON.parse(value)
			
			switch (key) {
				case 'filter':
					if (toString.call(parsed) !== '[object Object]') {
						throw new BadRequestError('Invalid filter parameter')
					}
					searchParams.match = parsed
					break
				
				case 'sort':
					const [key, value] = parsed
					if (!key || !isString(key) || ![-1, 1].includes(value)) {
						throw new BadRequestError('Invalid sort parameter')
					}
					searchParams.sort = { [key]: value }
					break
				
				case 'range':
					const [from, to] = parsed
					if (!isInteger(from) || from < 0 || !isInteger(to) || to < from) {
						throw new BadRequestError('Invalid range parameter')
					}
					searchParams.skip = from
					searchParams.limit = Math.min(to - from + 1, 50)
					break
			}
		})
	}
	catch (err) {
		if (!(err instanceof BadRequestError)) {
			err = new BadRequestError('Invalid format of query parameters')
		}
		return next(err)
	}
	
	if (size(searchParams) < 4) {
		return next(new BadRequestError('Invalid number of query parameters'))
	}
	
	res.locals.searchParams = searchParams
	next()
}
