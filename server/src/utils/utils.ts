import { mapValues, pickBy } from 'lodash'
import { Projection } from '../services/types'

type NonNullish = boolean | number | string | object

export const removeNullishProps = (object: Record<string, any>) => (
	pickBy(object, value => value != null) as Record<string, NonNullish>
)

export const projectNonNullishProps = <T>(object: Record<string, any>, projection: Projection) => (
	pickBy(object, (value, key) => projection[key] && value != null) as Record<string, NonNullish>
)

export const stringifyValues = (object: Record<string, any>) => (
	mapValues(object, JSON.stringify) as unknown as Record<string, string>
)
