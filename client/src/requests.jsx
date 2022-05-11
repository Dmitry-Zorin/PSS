import mapValues from 'just-map-values'
import reduce from 'just-reduce-object'
import { fetchUtils } from 'react-admin'
import { getUser, setUser } from './providers/authProvider'

export const apiUrl = `${import.meta.env.VITE_SERVER}/api`

const getUserInfo = () => ({
	authenticated: true,
	token: `Bearer ${localStorage.getItem('token')}`,
})

const createFormData = (body) => (
	reduce(body, (result, key, value) => {
		result.append(key, value.rawFile || value)
		return result
	}, new FormData())
)

const getBody = (body) => {
	if (body?.file) {
		return createFormData(body)
	}
	return JSON.stringify(body)
}

export const httpClient = (url, { body, ...options } = {}) => (
	fetchUtils.fetchJson(url, {
		...options,
		user: getUserInfo(),
		body: getBody(body),
	})
)

export const fetchApi = (url, options) => (
	httpClient(`${apiUrl}/${url}`, options)
)

export const createUrlWithQueryParams = (url, query) => {
	const serializedQuery = mapValues(query, e => (
		typeof e === 'object' ? JSON.stringify(e) : e
	))
	const queryParams = new URLSearchParams(serializedQuery)
	return `${url}?${queryParams}`
}

export const saveSettings = async (settings) => {
	setUser({ ...getUser(), ...settings })
	const options = { method: 'put', body: settings }
	await fetchApi('auth/settings', options)
}
