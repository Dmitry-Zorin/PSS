import { pickBy } from 'lodash'

type NonNullish = boolean | number | string | object

type Object = Record<string, unknown>

type FilteredObject = Record<string, NonNullish>

export const removeNullishProps = (object: Object) => (
	pickBy(object, value => value != null) as FilteredObject
)

export const projectNonNullishProps = (object: Object, projection: Object) => (
	pickBy(object, (value, key) => projection[key] && value != null) as FilteredObject
)
