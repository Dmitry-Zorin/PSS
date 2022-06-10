import { transform } from 'lodash'
import { apiUrl, createUrlWithQueryParams, fetchApi } from './requests'

function fetchResources(url, options) {
	return fetchApi(`resources/${url}`, options)
}

function processInputData(data) {
	return transform(data, (result, value, key) => {
		switch (key) {
			case 'publication':
				result[key] = processInputData(value)
				break
			case 'coauthors':
				result[key] = value.map((e) => ({ name: e }))
				break
			default:
				result[key] = value
		}
	})
}

function processOutputData(data) {
	return transform(data, (result, value, key) => {
		switch (key) {
			case 'publication':
				result[key] = processOutputData(value)
				break
			case 'coauthors':
				result[key] = value.map((e) => e.name)
				break
			default:
				result[key] = value
		}
	})
}

const dataProvider = {
	create: async (resource, { data }) => {
		const { json } = await fetchResources(resource, {
			method: 'post',
			body: processOutputData(data),
		})
		return {
			data: {
				...data,
				id: json.id,
			},
		}
	},

	update: async (resource, { id, data }) => {
		await fetchResources(`${resource}/${id}`, {
			method: 'put',
			body: processOutputData(data),
		})
		return { data: { id } }
	},

	getList: async (resource, { filter, sort, pagination }) => {
		const { page, perPage } = pagination

		const url = createUrlWithQueryParams(resource, {
			filter,
			sort,
			skip: (page - 1) * perPage,
			take: perPage,
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
