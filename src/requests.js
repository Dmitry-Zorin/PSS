import { user } from './providers/authProvider'
import { apiUrl, httpClient } from './providers/dataProvider.js'

export const fetchAPI = (url, options = {}) => (
	httpClient(`${apiUrl}/${url}`, options)
)

export const getResourceData = async (dataProvider, notify, author) => {
	const { json } = await fetchAPI(`form16?author=${author}`)
	
	if (json.every(data => Object.values(data).every(e => !e.length))) {
		return notify('ra.notification.author_not_found')
	}
	
	return json
}

export const saveSettings = (settings) => {
	localStorage.setItem('user', JSON.stringify({
		...user,
		...settings,
	}))
	/*fetchAPI('users', {
		method: 'PUT',
		body: JSON.stringify(settings),
	})*/
}
