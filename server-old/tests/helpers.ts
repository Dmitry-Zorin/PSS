import FormData from 'form-data'
import { isString, mapValues, reduce } from 'lodash'
import fetch, { RequestInit } from 'node-fetch'

const { SERVER } = process.env

export const TEST_COLLECTION_NAME = 'tests'

const TEST_ADMIN = {
	username: 'test admin',
	password: '12345678',
} as const

const getPath = (path: string, prefix: string) => (
	/^http/.test(path) ? path : `${prefix}/${path}`
)

export const fetchApi = async (path: string, options = {} as RequestInit, token?: string) => {
	const url = getPath(path, `${SERVER}/api`)
	return fetch(url, {
		...options,
		headers: {
			...token && { authorization: `Bearer ${token}` },
			...isString(options.body) && { 'content-type': 'application/json' },
			...options.headers,
		},
	})
}

export const fetchJson = async (...args: Parameters<typeof fetchApi>) => {
	const res = await fetchApi(...args)
	return {
		status: res.status,
		json: await res.json().catch(() => {}),
	}
}

export const login = async () => {
	const { json } = await fetchJson('auth/login', {
		method: 'post',
		body: JSON.stringify(TEST_ADMIN),
	})
	expect(json.error).toBeUndefined()
	expect(json.token).toBeString()
	return json.token as string
}

export interface FetchFunction {
	(path?: string, options?: RequestInit, toJson?: true): ReturnType<typeof fetchJson>
	(path: string, options: RequestInit, toJson: false): ReturnType<typeof fetchApi>
}

export const createFetchFunction = async (basePath?: string) => {
	const token = await login()
	const fetchFunction = (path = '', options?: RequestInit, toJson = true) => {
		const _path = basePath ? getPath(path, basePath) : path
		const fetch = toJson ? fetchJson : fetchApi
		return fetch(_path, options, token)
	}
	return fetchFunction as FetchFunction
}

export const stringifyValues = (object: Record<string, any>): Record<string, string> => (
	mapValues(object, value => JSON.stringify(value))
)

export const createFormData = (object: any, filename?: string) => (
	reduce(object, (result, value, key) => {
		const _filename = key === 'file' ? filename : undefined
		result.append(key, value, _filename)
		return result
	}, new FormData())
)
