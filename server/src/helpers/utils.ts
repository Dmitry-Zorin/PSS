import { pickBy } from 'lodash'

type NonNullish = boolean | number | string | object

export const removeNullishProps = (object: Record<string, any>) => (
	pickBy(object, value => value != null) as Record<string, NonNullish>
)

export const projectNonNullishProps = <T>(
	object: Record<string, any>,
	projection: Record<string, any>,
) => (
	pickBy(object, (value, key) => projection[key] && value != null) as Record<string, NonNullish>
)
