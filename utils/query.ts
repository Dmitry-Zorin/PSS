import { isNumber, isString, transform } from 'lodash'

interface ParsedQuery {
	strings: Record<string, string | undefined>
	numbers: Record<string, number | undefined>
}

export function parseQuery(query: Record<string, any>) {
	return transform(
		query,
		(result: ParsedQuery, value, key) => {
			if (value && isNumber(+value)) {
				return (result.numbers[key] = +value)
			}
			if (isString(value)) {
				result.strings[key] = value
			}
		},
		{ strings: {}, numbers: {} },
	)
}
