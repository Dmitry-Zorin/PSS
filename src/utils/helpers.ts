import { isPlainObject, mapValues, pickBy } from 'lodash'
import { PartialOnUndefinedDeep } from 'type-fest'

export async function getSafeAsync<T>(fn: () => Promise<T>) {
	const response: { data?: T; error?: unknown } = {}
	try {
		response.data = await fn()
	} catch (err) {
		response.error = err
	}
	return response
}

type ReplaceNullWithUndefined<T> = T extends null
	? undefined
	: T extends Date
	? Date
	: {
			[K in keyof T]: T[K] extends (infer U)[]
				? ReplaceNullWithUndefined<U>[]
				: ReplaceNullWithUndefined<T[K]>
	  }

function _omitNull(value: any): any {
	if (value === null) return undefined
	if (Array.isArray(value)) {
		return value.map(_omitNull)
	}
	if (isPlainObject(value)) {
		return pickBy(mapValues(value, _omitNull), _omitNull)
	}
	return value
}

export function omitNull<T>(
	value: T,
): PartialOnUndefinedDeep<
	ReplaceNullWithUndefined<T>,
	{ recurseIntoArrays: true }
> {
	return _omitNull(value)
}
