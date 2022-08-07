import { isString, transform } from 'lodash'

type QueryParams = Record<string, any>

interface CreateUrlWithQueryOptions {
	path: string
	subpath?: string
	params?: QueryParams
}

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

export function createUrlWithQuery({
	path,
	subpath,
	params,
}: CreateUrlWithQueryOptions) {
	return `/${path}${subpath ? `/${subpath}` : ''}${
		params ? `?${createQueryParams(params)}` : ''
	}`
}

async function fetchApi(url: string, options?: RequestInit) {
	const res = await fetch(url, options)
	if (!res.ok) {
		throw new Error(res.statusText)
	}
	return res.json()
}

export async function query(subpath: string, params: Record<string, unknown>) {
	return fetchApi(
		createUrlWithQuery({
			path: 'api',
			subpath,
			params,
		}),
	)
}

export interface MutateOptions extends Omit<RequestInit, 'body'> {
	body: string | Record<string, unknown>
}

export async function mutate(
	subpath: string,
	{ body, ...options }: MutateOptions,
) {
	return fetchApi(
		createUrlWithQuery({
			path: 'api',
			subpath,
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: isString(body) ? body : JSON.stringify(body),
			...options,
		},
	)
}
