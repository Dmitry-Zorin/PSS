import reduce from 'just-reduce-object'
import { fetchUtils } from 'react-admin'

export const apiUrl = `${process.env.SERVER}/api`

export const httpClient = (url, options = {}) => {
	options.user = {
		authenticated: true,
		token: `Bearer ${localStorage.getItem('token')}`,
	}
	if (!options.headers) {
		options.headers = new Headers({ accept: 'application/json' })
	}
	if (options.body) {
		const body = options.body
		if (body.file) {
			options.body = reduce(body, (obj, key, value) => {
				obj.append(key, value.rawFile || JSON.stringify(value))
				return obj
			}, new FormData())
		}
		else {
			options.headers.set('content-type', 'application/x-www-form-urlencoded')
			options.body = new URLSearchParams(Object.entries(body))
		}
	}
	return fetchUtils.fetchJson(url, options)
}

const dataProvider = {
	create: async (resource, params) => {
		const options = { method: 'post', body: params.data }
		const { json } = await httpClient(`${apiUrl}/${resource}`, options)
		return { data: { ...params.data, id: json.id } }
	},
	getList: async (resource, params) => {
		const {
			filter: match,
			sort: { field, order },
			pagination: { page, perPage },
		} = params
		
		const sort = { [field]: +/^asc$/i.test(order) - +/^desc$/i.test(order) || order }
		const skip = (page - 1) * perPage
		const limit = perPage
		
		const query = JSON.stringify({ match, sort, skip, limit })
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
	getOne: async (resource, params) => {
		const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`)
		return { data: json }
	},
	update: async (resource, params) => {
		const options = { method: 'put', body: params.data }
		const { json } = httpClient(`${apiUrl}/${resource}/${params.id}`, options)
		return { data: json }
	},
	delete: async (resource, params) => {
		const options = {
			method: 'delete',
			headers: new Headers({ 'content-type': 'text/plain' }),
		}
		const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, options)
		return { data: json }
	},
}

export default dataProvider
