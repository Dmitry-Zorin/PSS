import createHttpError from 'http-errors'
import { transform } from 'lodash'

export function getBaseUrl() {
	if (typeof window !== 'undefined') {
		return ''
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}
	return `http://localhost:${process.env.PORT ?? 3000}`
}

type QueryParams = Record<string, any>

function createQueryParams(params: QueryParams) {
	const serializedQuery = transform(
		params,
		(result: QueryParams, value, key) => {
			if (value) {
				result[key] = typeof value === 'string' ? value : JSON.stringify(value)
			}
		},
	)
	return new URLSearchParams(serializedQuery)
}

async function fetchApi(url: string, options?: RequestInit) {
	const res = await fetch(url, options)
	if (!res.ok) {
		throw createHttpError(res.status, await res.text())
	}
	return res.json()
}

export async function query<T>(
	path: string,
	params?: QueryParams,
	options?: RequestInit,
): Promise<T> {
	return fetchApi(
		`${getBaseUrl()}/api/${path}${
			params ? `?${createQueryParams(params)}` : ''
		}`,
		options,
	)
}

export interface MutateOptions extends Omit<RequestInit, 'body'> {
	body?: string | Record<string, unknown>
}

export async function mutate<T>(
	path: string,
	{ body, ...options }: MutateOptions,
): Promise<T> {
	return fetchApi(`${getBaseUrl()}/api/${path}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		body: body
			? typeof body === 'string'
				? body
				: JSON.stringify(body)
			: undefined,
		...options,
	})
}
