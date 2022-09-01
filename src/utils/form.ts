import { isString, pickBy } from 'lodash'

export function omitEmptyStrings<T>(data: Record<string, T>) {
	return pickBy(data, (e) => {
		return isString(e) ? e?.length : true
	})
}
