import fetch, { RequestInfo, RequestInit } from 'node-fetch'

export const TEST_COLLECTION_NAME = 'tests'

const testUser = {
	username: 'dima',
	password: 'zorin',
}

export const fetchApi = async (path: RequestInfo, options?: RequestInit, token?: string) => {
	const resp = await fetch(`${process.env.SERVER}/api/${path}`, {
		...options,
		headers: {
			...token && { authorization: `Bearer ${token}` },
			...options?.headers,
		},
	})
	return {
		status: resp.status,
		json: await resp.json().catch(() => null),
	}
}

export const login = async () => {
	const { json } = await fetchApi('auth/login', {
		method: 'post',
		body: new URLSearchParams(testUser),
	})
	expect(json.error).toBeUndefined()
	expect(json.token).toBeString()
	return json.token
}

export interface FetchFunction {
	(path?: string, options?: RequestInit): Promise<{ json: any, status: number }>
}

export const createFetchFunction = async (basePath?: string): Promise<FetchFunction> => {
	const token = await login()
	return (path = '', options) => {
		const _path = basePath ? `${basePath}/${path}` : path
		return fetchApi(_path, options, token)
	}
}
