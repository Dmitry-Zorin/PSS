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

export async function query(subpath: string, params: Record<string, any>) {
	const res = await fetch(
		createUrlWithQuery({
			path: 'api',
			subpath,
			params,
		}),
	)
	if (!res.ok) {
		throw new Error(res.statusText)
	}
	return res.json()
}

export async function mutate(
	subpath: string,
	{ body, ...options }: RequestInit,
) {
	const res = await fetch(
		createUrlWithQuery({
			path: 'api',
			subpath,
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
			...options,
		},
	)
	if (!res.ok) {
		throw new Error(res.statusText)
	}
	return res.json()
}
