import { isBrowser } from 'framer-motion'
import createHttpError from 'http-errors'
import { isString, transform } from 'lodash'

export function getBaseUrl() {
	if (isBrowser) {
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
				result[key] = isString(value) ? value : JSON.stringify(value)
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
	body?: Record<string, unknown>
}

export async function mutate<T>(
	path: string,
	{ body, ...options }: MutateOptions,
): Promise<T> {
	return fetchApi(`${getBaseUrl()}/api/${path}`, {
		headers: {
			'Content-Type': body?.file ? 'multipart/form-data' : 'application/json',
		},
		body: body
			? body?.file
				? createFormData(body)
				: JSON.stringify(body)
			: undefined,
		...options,
	})
}

export function createFormData(data: Record<string, any>) {
	return transform(
		data,
		(formData, value, key) => {
			formData.append(key, value)
		},
		new FormData(),
	)
}
