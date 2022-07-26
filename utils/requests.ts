import { isString, transform } from 'lodash'

type Query = Record<string, any>

interface CreateUrlWithQueryOptions {
	protocol?: string
	host: string
	path: string
	subpath?: string
	query?: Query
}

function createQueryParams(query: Query) {
	const serializedQuery = transform(query, (result: Query, value, key) => {
		if (value) {
			result[key] = isString(value) ? value : JSON.stringify(value)
		}
	})
	return new URLSearchParams(serializedQuery)
}

export function createUrlWithQuery({
	protocol = 'https',
	host,
	path,
	subpath,
	query,
}: CreateUrlWithQueryOptions) {
	return `${protocol}://${host}/${path}${subpath ? `/${subpath}` : ''}${
		query ? `?${createQueryParams(query)}` : ''
	}`
}
