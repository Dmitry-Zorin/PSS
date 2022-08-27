import { cloneDeepWith } from 'lodash'

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

export function omitNull<Object extends Record<string, unknown>>(
	obj: Object,
): ReplaceNullWithUndefined<Object>
export function omitNull<Object extends Record<string, unknown>>(
	obj: Object[],
): ReplaceNullWithUndefined<Object>[]
export function omitNull<Object extends Record<string, unknown>>(
	obj: Object | Object[],
) {
	const omitNullObject = (obj: Object) => {
		return cloneDeepWith(obj, (value) => {
			return value ?? undefined
		}) as ReplaceNullWithUndefined<Object>
	}
	if (Array.isArray(obj)) {
		return obj.map(omitNullObject)
	}
	return omitNullObject(obj)
}
