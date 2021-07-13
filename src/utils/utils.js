import { fetchUtils } from 'react-admin'
import authProvider from '../admin/providers/authProvider'

export const fetchAPI = (url, options = {}) => (
	fetchUtils.fetchJson(`${process.env.SERVER}/api/${url}`, {
		credentials: 'include',
		...options,
	})
)

export const getResourceData = async (dataProvider, notify, author) => {
	const { json } = await fetchAPI(`form16?author=${author}`)
	
	if (json.every(data => Object.values(data).every(e => !e.length))) {
		return notify('ra.notification.author_not_found')
	}
	
	return json
}

export const saveSettings = async (settings) => {
	const {status} = await fetchAPI('users', {
		method: 'PUT',
		body: JSON.stringify(settings),
	})
	if (status === 200) {
		localStorage.setItem('user', JSON.stringify({
			...authProvider.user,
			...settings
		}))
	}
}
