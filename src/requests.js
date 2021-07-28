import { user } from './providers/authProvider'
import { apiUrl, httpClient } from './providers/dataProvider.js'

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

export const saveSettings = (settings) => {
	const userInfo = JSON.stringify({ ...user, ...settings })
	localStorage.setItem('user', userInfo)
	
	const options = { method: 'put', body: settings }
	fetchApi('auth/identity', options)
}
