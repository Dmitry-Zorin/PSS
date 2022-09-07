import { isBrowser } from 'framer-motion'
import createHttpError from 'http-errors'
import { stringify } from 'querystring'

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
		`${getBaseUrl()}/api/${path}${params ? `?${stringify(params)}` : ''}`,
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
		body: body ? JSON.stringify(body) : undefined,
		...options,
	})
}
