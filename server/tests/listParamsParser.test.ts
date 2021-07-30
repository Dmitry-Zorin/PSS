import { NextFunction, Request, Response } from 'express'
import listParamsParser from '../app/routes/api/resources/middleware/listParamsParser'
import { stringifyValues } from '../utils/utils'

const parseGetListParams = (listParams: any) => {
	const req = { query: listParams }
	const res = { locals: {} as Record<string, any> }
	const next = (err: any) => {
		if (err) res.locals = err.message
	}
	listParamsParser(req as Request, res as Response, next as NextFunction)
	return res.locals
}

test('Parse correct getList parameters', () => {
	const listParams = {
		match: { username: 'test' },
		sort: { username: 1 },
		skip: 2,
		limit: 4,
	}
	expect(parseGetListParams(stringifyValues(listParams))).toEqual(listParams)
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
		op: 'skip',
		tests: [
			'1',
			-1,
		],
	},
	{
		op: 'limit',
		tests: [
			'1',
			-1,
		],
	},
]

describe.each(ops)('Refuse to parse incorrect $op parameters', ({ op, tests }) => {
	test.each(tests)(`Test { ${op}: %j }`, (value) => {
		const listParams = stringifyValues({ [op]: value })
		expect(parseGetListParams(listParams)).toBe(`Invalid ${op} parameter`)
	})
})
