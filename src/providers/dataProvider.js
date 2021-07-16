import simpleRestProvider from 'ra-data-simple-rest'
import { fetchUtils } from 'react-admin'

export const apiUrl = `${process.env.SERVER}/api`

export const httpClient = (url, options = {}) => {
	options.user = {
		authenticated: true,
		token: `Bearer ${localStorage.getItem('token')}`,
	}
	return fetchUtils.fetchJson(url, options)
}

export default simpleRestProvider(apiUrl, httpClient)
