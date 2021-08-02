import { stringifyValues } from '../../../../utils/utils'
import listParamsParser from './list-params-parser'

const parseGetListParams = (listParams: any) => {
	const req: any = { query: listParams }
	const res: any = { locals: {} }
	const next = (err: any) => {
		if (err) res.locals.listParams = err.message
	}
	listParamsParser(req, res, next)
	return res.locals.listParams
}

test('Parse valid getList parameters', () => {
	const listParams = {
		match: { username: 'test' },
		sort: { username: 1 },
		skip: 2,
		limit: 4,
	}
	expect(parseGetListParams(stringifyValues(listParams))).toEqual(listParams)
})

describe('Refuse to parse invalid parameters', () => {
	const matchTests = [
		'{ username: "test" }',
		['username', 'test'],
		'username',
	]
	const sortTests = [
		'["username", 1]',
		['username', 'desc'],
		['', 1],
		[1, 1],
		'username',
	]
	const skipAndLimitTests = ['1', -1]
	
	const ops: { op: string, tests: any[] }[] = [
		{ op: 'match', tests: matchTests },
		{ op: 'sort', tests: sortTests },
		{ op: 'skip', tests: skipAndLimitTests },
		{ op: 'limit', tests: skipAndLimitTests },
	]
	
	describe.each(ops)('Invalid $op parameters', ({ op, tests }) => {
		test.each(tests)(`Test { ${op}: %j }`, (value) => {
			const listParams = stringifyValues({ [op]: value })
			expect(parseGetListParams(listParams)).toBe(`Invalid ${op} parameter`)
		})
	})
})
