import simpleRestProvider from 'ra-data-simple-rest'
import { fetchUtils } from 'react-admin'

export const apiUrl = `${process.env.SERVER}/api`

export const httpClient = (url, options = {}) => {
	options.user = {
		authenticated: true,
		token: `Bearer ${localStorage.getItem('token')}`,
	}
	if (!options.headers) {
		options.headers = new Headers({ Accept: 'application/json, application/octet-stream' })
	}
	if (options.body) {
		const body = options.body
		if (body.file) {
			const formData = new FormData()
			for (const [key, value] of Object.entries(body)) {
				formData.append(key, value.rawFile || JSON.stringify(value))
			}
			options.body = formData
		}
		else {
			options.headers.set('Content-Type', 'application/x-www-form-urlencoded')
			options.body = new URLSearchParams(Object.entries(body))
		}
	}
	return fetchUtils.fetchJson(url, options)
}

export default {
	...simpleRestProvider(apiUrl, httpClient),
	create: async (resource, params) => {
		const { json } = await httpClient(`${apiUrl}/${resource}`, {
			method: 'post',
			body: params.data,
		})
		return {
			data: { ...params.data, id: json.id },
		}
	},
}
