import mapValues from 'just-map-values'
import reduce from 'just-reduce-object'
import { fetchUtils } from 'react-admin'

const getUser = () => ({
	authenticated: true,
	token: `Bearer ${localStorage.getItem('token')}`,
})

const createFormData = (body) => (
	reduce(body, (result, key, value) => {
		result.append(key, value?.rawFile ?? JSON.stringify(value))
		return result
	}, new FormData())
)

const getBody = (body) => (
	(body?.file ? createFormData : JSON.stringify)(body)
)

export const httpClient = (url, { body, ...options } = {}) => (
	fetchUtils.fetchJson(url, {
		...options,
		user: getUser(),
		body: getBody(body),
	})
)

export const apiUrl = `${import.meta.env.VITE_SERVER}/api`

const resourcesUrl = `${apiUrl}/resources`

const dataProvider = {
	create: async (resource, { data }) => {
		const options = { method: 'post', body: data }
		const { json } = await httpClient(`${resourcesUrl}/${resource}`, options)
		return { data: { ...data, id: json.id } }
	},
	
	getList: async (resource, { filter, sort, pagination }) => {
		const { field, order } = sort
		const { page, perPage } = pagination
		const skip = (page - 1) * perPage
		const limit = perPage

		const query = mapValues({
			match: filter,
			sort: { [field]: order },
			skip,
			limit,
		}, value => JSON.stringify(value))

		const { headers, json } = await httpClient(
			`${resourcesUrl}/${resource}?${new URLSearchParams(query)}`
		)
		return {
			data: json,
			total: +headers.get('content-range').split('/').pop()
		}
	},
	
	getOne: async (resource, { id }) => {
		const { json } = await httpClient(`${resourcesUrl}/${resource}/${id}`)
		return { data: json }
	},
	
	update: async (resource, { id, data }) => {
		const options = { method: 'put', body: data }
		await httpClient(`${resourcesUrl}/${resource}/${id}`, options)
		return { data: { id } }
	},
	
	delete: async (resource, { id }) => {
		const options = {
			method: 'delete',
			headers: new Headers({ 'content-type': 'text/plain' }),
		}
		await httpClient(`${resourcesUrl}/${resource}/${id}`, options)
		return { data: { id } }
	},
	
	deleteMany: async (resource, { ids }) => {
		const options = {
			method: 'delete',
			headers: new Headers({ 'content-type': 'text/plain' }),
		}
		await Promise.all(ids.map(id => (
			httpClient(`${resourcesUrl}/${resource}/${id}`, options)
		)))
		return { data: ids }
	},
}

export default dataProvider