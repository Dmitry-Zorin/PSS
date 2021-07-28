import { mapValues, pickBy } from 'lodash'
import fetch from 'node-fetch'
import { Projection } from './db/projections/types'
import { createEnvError } from './errors'

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

type FetchParams = Parameters<typeof fetch>

export const fetchApi = async (path: FetchParams[0], options?: FetchParams[1], token?: string) => {
	const { SERVER } = process.env
	
	if (!SERVER) {
		throw createEnvError('server')
	}
	
	const resp = await fetch(`${SERVER}/api/${path}`, {
		...options,
		headers: {
			...token && { authorization: `Bearer ${token}` },
			...options?.headers,
		},
	})
	return {
		status: resp.status,
		json: await resp.json().catch(() => null),
	}
}
