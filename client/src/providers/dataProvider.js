import reduce from 'just-reduce-object'
import { apiUrl, createUrlWithQueryParams, fetchApi } from '../requests'

const fetchResources = (url, options) => (
	fetchApi(`resources/${url}`, options)
)

const processInputData = (data) => (
	reduce(data, (result, key, value) => {
		if (value === 'coauthors') {
			value = value.map(e => ({ name: e }))
		}
		result[key] = value
		return result
	}, {})
)

const processOutputData = (data, options = { skipEmpty: true }) => (
	reduce(data, (result, key, value) => {
		if (options.skipEmpty && !value) {
			return result
		}
		if (value === 'coauthors') {
			value = value.map(e => e.name)
		}
		result[key] = value
		return result
	}, {})
)

const dataProvider = {
	create: async (resource, { data }) => {
		const { json } = await fetchResources(resource, {
			method: 'post',
			body: processOutputData(data),
		})
		return {
			data: { ...data, id: json.id },
		}
	},

	getList: async (resource, { filter, sort, pagination }) => {
		const { field, order } = sort
		const { page, perPage } = pagination
		const skip = (page - 1) * perPage
		const limit = perPage

		const url = createUrlWithQueryParams(resource, {
			match: filter,
			sort: { [field]: order },
			skip,
			limit,
		})

		const { headers, json } = await fetchResources(url)

		return {
			data: json.map(processInputData),
			total: +headers.get('content-range').split('/').pop(),
		}
	},

	getOne: async (resource, { id }) => {
		const { json } = await fetchResources(`${resource}/${id}`)
		if (json.file) {
			json.file.url = `${apiUrl}/resources/files/${resource}/${json.file.objectId}`
		}
		return { data: processInputData(json) }
	},

	getMany: async (resource, { ids }) => {
		const url = createUrlWithQueryParams(resource, { ids })
		const { json } = await fetchResources(url)
		return { data: json.map(processInputData) }
	},

	update: async (resource, { id, data }) => {
		await fetchResources(`${resource}/${id}`, {
			method: 'put',
			body: processOutputData(data, {
				skipEmpty: false,
			}),
		})
		return { data: { id } }
	},

	delete: async (resource, { id }) => {
		await fetchResources(`${resource}/${id}`, {
			method: 'delete',
			headers: new Headers({
				'content-type': 'text/plain',
			}),
		})
		return { data: { id } }
	},

	deleteMany: async (resource, { ids }) => {
		const url = createUrlWithQueryParams(resource, { ids })
		const { json } = await fetchResources(url, {
			method: 'delete',
			headers: new Headers({
				'content-type': 'text/plain',
			}),
		})
		return { data: json }
	},
}

export default dataProvider
