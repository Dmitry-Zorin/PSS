import { mapValues } from 'lodash'
import listParamsParser from '../middleware/listParamsParser'
import { NextFunction, Request, Response } from 'express'

const parseGetListParams = (listParams: any) => {
	const req = { query: listParams }
	const res: any = { locals: {} }
	const next = (err: any) => {
		if (err) res.locals.searchParams = err.message
	}
	listParamsParser(req as Request, res as Response, next as NextFunction)
	return res.locals.searchParams
}

const stringifyValues = (object: object) => (
	mapValues(object, JSON.stringify)
)

test('Parse correct getList parameters', () => {
	const listParams = stringifyValues({
		filter: { username: 'test' },
		sort: ['username', 1],
		range: [2, 5],
	})
	
	const searchParams = {
		match: { username: 'test' },
		sort: { username: 1 },
		skip: 2,
		limit: 4,
	}
	
	expect(parseGetListParams(listParams)).toEqual(searchParams)
})

const ops: { op: string, tests: any[] }[] = [
	{
		op: 'filter',
		tests: [
			'{ username: "test" }',
			['username', 'test'],
			'username',
		],
	},
	{
		op: 'sort',
		tests: [
			'["username", 1]',
			['username', 'desc'],
			['', 1],
			[1, 1],
			'username',
		],
	},
	{
		op: 'range',
		tests: [
			'[1, 2]',
			[-1, 2],
			[0, -2],
			[1, 0],
		],
	},
]

describe.each(ops)('Refuse to parse incorrect $op parameters', ({ op, tests }) => {
	test.each(tests)(`Test { ${op}: %j }`, (value) => {
		const listParams = stringifyValues({ [op]: value })
		expect(parseGetListParams(listParams)).toBe(`Invalid ${op} parameter`)
	})
})
