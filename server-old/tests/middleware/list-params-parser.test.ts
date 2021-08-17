import { listParamsParser } from '../../src/middleware'
import { stringifyValues } from '../helpers'

const parseGetListParams = async (listParams: any) => {
	const req: any = { query: listParams }
	const res: any = { locals: {} }
	const next = (err: any) => {
		if (err) res.locals.listParams = err.message
	}
	await listParamsParser()(req, res, next)
	return res.locals.listParams
}

test('Parse valid getList parameters', async () => {
	const listParams = {
		match: { username: 'test' },
		sort: { username: 1 },
		skip: 2,
		limit: 4,
	}
	const parsedParams = await parseGetListParams(stringifyValues(listParams))
	expect(parsedParams).toEqual(listParams)
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
		test.each(tests)(`Test { ${op}: %j }`, async (value) => {
			const listParams = stringifyValues({ [op]: value })
			const parsedParams = await parseGetListParams(listParams)
			expect(parsedParams).toBe(`Invalid ${op} parameter`)
		})
	})
})
