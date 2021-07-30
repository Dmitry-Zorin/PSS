import reduce from 'just-reduce-object'
import { fetchUtils } from 'react-admin'

export const apiUrl = `${process.env.SERVER}/api`

export const httpClient = (url, options = {}) => {
	options.user = {
		authenticated: true,
		token: `Bearer ${localStorage.getItem('token')}`,
	}
	options.headers ||= new Headers()
	
	if (options.body) {
		if (options.body.file) {
			options.body = reduce(options.body, (result, key, value) => {
				result.append(key, value?.rawFile || JSON.stringify(value))
				return result
			}, new FormData())
		}
		else {
			options.headers.set('content-type', 'application/x-www-form-urlencoded')
			options.body = new URLSearchParams(Object.entries(options.body))
		}
	}
	
	return fetchUtils.fetchJson(url, options)
}

const dataProvider = {
	create: async (resource, { data }) => {
		const options = { method: 'post', body: data }
		const { json } = await httpClient(`${apiUrl}/${resource}`, options)
		return { data: { ...data, id: json.id } }
	},
	
	getList: async (resource, { filter, sort, pagination }) => {
		const { field, order } = sort
		const { page, perPage } = pagination
		const skip = (page - 1) * perPage
		const limit = perPage
		
		const sortOrder = +/^asc$/i.test(order) - +/^desc$/i.test(order) || order
		
		const query = JSON.stringify({
			match: filter,
			sort: { [field]: sortOrder },
			skip,
			limit
		})
		
		const url = `${apiUrl}/${resource}?${new URLSearchParams(query)}`
		
		const options = {
			headers: new Headers({
				Range: `${resource}=${skip}-${skip + limit}`,
			}),
		}
		
		const { headers, json } = await httpClient(url, options)
		const total = +headers.get('content-range').split('/').pop()
		return { data: json, total }
	},
	
	getOne: async (resource, { id }) => {
		const { json } = await httpClient(`${apiUrl}/${resource}/${id}`)
		return { data: json }
	},
	
	update: async (resource, { id, data }) => {
		const options = { method: 'put', body: data }
		const { json } = await httpClient(`${apiUrl}/${resource}/${id}`, options)
		return { data: json }
	},
	
	delete: async (resource, { id }) => {
		const options = {
			method: 'delete',
			headers: new Headers({ 'content-type': 'text/plain' }),
		}
		const { json } = await httpClient(`${apiUrl}/${resource}/${id}`, options)
		return { data: json }
	},
}

export default dataProvider
