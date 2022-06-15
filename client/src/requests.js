import { mapValues, reduce } from 'lodash'
import { fetchUtils } from 'react-admin'
import { getUser, setUser } from 'user'

export const apiUrl = `${import.meta.env.VITE_SERVER || ''}/api`

function createFormData(payload) {
	return reduce(
		payload,
		(result, key, value) => {
			result.append(key, value.rawFile || value)
			return result
		},
		new FormData(),
	)
}

export function httpClient(url, { body, ...options } = {}) {
	return fetchUtils.fetchJson(url, {
		...options,
		user: {
			authenticated: true,
			token: `Bearer ${localStorage.getItem('token')}`,
		},
		body: body?.file ? createFormData(body) : JSON.stringify(body),
	})
}

export function fetchApi(url, options) {
	return httpClient(`${apiUrl}/${url}`, options)
}

export function createUrlWithQueryParams(url, query) {
	const serializedQuery = mapValues(query, (e) => {
		return typeof e === 'object' ? JSON.stringify(e) : e
	})
	const queryParams = new URLSearchParams(serializedQuery)
	return `${url}?${queryParams}`
}

export async function saveSettings(settings) {
	const user = getUser()

	setUser({
		...user,
		settings: {
			...user.settings,
			...settings,
		},
	})

	if (user.role !== 'guest') {
		await fetchApi('auth/settings', {
			method: 'put',
			body: settings,
		})
	}
}
