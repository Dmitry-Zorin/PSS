import { getUser, setUser } from './providers/authProvider'
import { apiUrl, httpClient } from './providers/dataProvider'

export const fetchApi = (url, options) => (
	httpClient(`${apiUrl}/${url}`, options)
)

export const getResourceData = async (dataProvider, notify, author) => {
	const { json } = await fetchApi(`form16?author=${author}`)
	if (json.every(data => Object.values(data).every(e => !e.length))) {
		return notify('ra.notification.author_not_found')
	}
	return json
}

export const saveSettings = async (settings) => {
	setUser({ ...getUser(), ...settings })
	const options = { method: 'put', body: settings }
	await fetchApi('auth/settings', options)
}
