import { transform } from 'lodash'
import { DataProvider, DeleteResult, GetOneResult } from 'react-admin'
import {
	apiUrl,
	createUrlWithQueryParams,
	fetchApi,
	HttpClientOptions,
} from 'requests'

function fetchResources(url: string, options?: HttpClientOptions) {
	return fetchApi(`resources/${url}`, options)
}

function processInputData(data: Record<string, any>) {
	return transform(data, (result: Record<string, any>, value, key) => {
		switch (key) {
			case 'publication':
				result[key] = processInputData(value)
				break
			case 'coauthors':
				result[key] = (value as string[]).map((e) => ({ name: e }))
				break
			default:
				result[key] = value
		}
	})
}

function processOutputData(data: Record<string, any>) {
	return transform(data, (result: Record<string, any>, value, key) => {
		switch (key) {
			case 'publication':
				result[key] = processOutputData(value)
				break
			case 'coauthors':
				result[key] = (value as { name: string }[]).map((e) => e.name)
				break
			default:
				result[key] = value
		}
	})
}

const dataProvider: DataProvider = {
	async create(resource, { data }) {
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

	async update(resource, { id, data }) {
		await fetchResources(`${resource}/${id}`, {
			method: 'put',
			body: processOutputData(data),
		})
		return { data: { id } as any }
	},

	updateMany() {
		throw new Error('Function not implemented.')
	},

	async getList(resource, { filter, sort, pagination }) {
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
			total: +headers.get('Content-Range')!.split('/').pop()!,
		}
	},

	async getOne(resource, { id }) {
		const { json } = await fetchResources(`${resource}/${id}`)
		if (json.file) {
			json.file.url = `${apiUrl}/resources/files/${resource}/${json.file.objectId}`
		}
		return { data: processInputData(json) } as GetOneResult
	},

	async getMany(resource, { ids }) {
		const url = createUrlWithQueryParams(resource, { ids })
		const { json } = await fetchResources(url)
		return { data: json.map(processInputData) }
	},

	getManyReference() {
		throw new Error('Function not implemented.')
	},

	async delete(resource, { id }) {
		await fetchResources(`${resource}/${id}`, {
			method: 'delete',
			headers: new Headers({
				'Content-Type': 'text/plain',
			}),
		})
		return { data: { id } } as DeleteResult
	},

	async deleteMany(resource, { ids }) {
		const url = createUrlWithQueryParams(resource, { ids })
		const { json } = await fetchResources(url, {
			method: 'delete',
			headers: new Headers({
				'Content-Type': 'text/plain',
			}),
		})
		return { data: json }
	},
}

export default dataProvider
