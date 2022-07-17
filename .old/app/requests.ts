import { getAuthToken } from '~/auth.provider'
import { isString, mapValues, reduce } from 'lodash'
import type { Options } from 'react-admin'
import { fetchUtils } from 'react-admin'
import type { Settings } from 'user'

export const apiUrl = `${''}/api`

function createFormData(payload: Record<string, any>) {
	return reduce(
		payload,
		(result, value, key) => {
			result.append(key, value?.rawFile || value)
			return result
		},
		new FormData(),
	)
}

export interface HttpClientOptions extends Omit<Options, 'user' | 'body'> {
	body?: Record<string, any>
}

export function httpClient(
	url: string,
	{ body, ...options }: HttpClientOptions = {},
) {
	const token = getAuthToken()
	return fetchUtils.fetchJson(url, {
		...options,
		...(token && {
			user: {
				authenticated: true,
				token: `Bearer ${token}`,
			},
		}),
		body: body?.file ? createFormData(body) : JSON.stringify(body),
	})
}

export function fetchApi(url: string, options?: HttpClientOptions) {
	return httpClient(`${apiUrl}/${url}`, options)
}

export function createUrlWithQueryParams(
	url: string,
	query: Record<string, any>,
) {
	const serializedQuery = mapValues(query, (e) => {
		return isString(e) ? e : JSON.stringify(e)
	})
	const queryParams = new URLSearchParams(serializedQuery)
	return `${url}?${queryParams}`
}

export async function saveSettings(settings: Partial<Settings>) {
	if (getAuthToken()) {
		await fetchApi('auth/settings', {
			method: 'put',
			body: settings,
		})
	}
}
