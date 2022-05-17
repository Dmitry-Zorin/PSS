import { isEmpty, isObject, mapValues } from 'lodash'

export const omitNullDeep = (e: any): any => {
	if (e === null) {
		return undefined
	}
	if (Array.isArray(e)) {
		return e.map(omitNullDeep)
	}
	if (isObject(e) && !isEmpty(e)) {
		return mapValues(e, omitNullDeep)
	}
	return e
}
