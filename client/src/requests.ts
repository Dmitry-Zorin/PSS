import { isString, mapValues, reduce } from 'lodash'
import { fetchUtils, Options } from 'react-admin'
import { getToken, getUser, Role, Settings, setUser } from 'user'

export const apiUrl = `${import.meta.env.VITE_SERVER || ''}/api`

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
	const token = getToken()
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
	const user = getUser()
	setUser({
		...user,
		settings: {
			...user.settings,
			...settings,
		},
	})
	if (user.role !== Role.Guest) {
		await fetchApi('auth/settings', {
			method: 'put',
			body: settings,
		})
	}
}
