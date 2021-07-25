import bcrypt from 'bcrypt'
import { pickBy } from 'lodash'
import fetch, { RequestInit } from 'node-fetch'
import { Projection } from './projections/projection.interface'
import { createEnvError } from './errors'

type NonNullish = boolean | number | string | object

export const removeNullishProps = (object: Record<string, any>)  => (
	pickBy(object, value => value != null) as Record<string, NonNullish>
)

removeNullishProps({a: [1,2]})

export const projectNonNullishProps = <T>(object: Record<string, any>, projection: Projection) => (
	pickBy(object, (value, key) => projection[key] && value) as Record<string, NonNullish>
)

export const generatePassword = async (password: string, salt = 10): Promise<string> => (
	password ? bcrypt.hash(password, salt).catch(() => '') : ''
)

export const isCorrectPassword = (password: string, hash: string): Promise<boolean> => (
	bcrypt.compare(password, hash).catch(() => false)
)

interface FetchApiResponse {
	status: number,
	json: any
}

export const fetchApi = async (path: string, options: RequestInit = {}, token?: string): Promise<FetchApiResponse> => {
	const { SERVER } = process.env
	
	if (!SERVER) {
		throw createEnvError('server')
	}
	
	const resp = await fetch(`${SERVER}/api/${path}`, {
		...options,
		headers: {
			...token && { authorization: `Bearer ${token}` },
			...options.headers,
		},
	})
	return {
		status: resp.status,
		json: await resp.json().catch(() => ({})),
	}
}
