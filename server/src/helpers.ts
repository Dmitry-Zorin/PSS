// import FormData from 'form-data'
// import { isString, mapValues, reduce } from 'lodash'
// import fetch, { RequestInit, Response } from 'node-fetch'
//
// const { SERVER } = process.env
//
// export const TEST_COLLECTION_NAME = 'tests'
//
// const testUser = {
// 	username: 'dima',
// 	password: 'zorin',
// }
//
// interface JsonResponse {
// 	status: number,
// 	json: Record<string, any>
// }
//
// interface FetchApi {
// 	(path: string, options: RequestInit, token?: string): Promise<JsonResponse>
// 	(path: string, options: RequestInit, token: string, toJson?: boolean): Promise<Response>
// }
//
// export const fetchApi: FetchApi = async (path, options, token, toJson = true) => {
// 	const url = /^http/.test(path) ? path : `${SERVER}/api/${path}`
//
// 	const res = await fetch(url, {
// 		...options,
// 		headers: {
// 			...token && { authorization: `Bearer ${token}` },
// 			...isString(options.body) && { 'content-type': 'application/json' },
// 			...options.headers,
// 		},
// 	})
//
// 	if (toJson) {
// 		return {
// 			status: res.status,
// 			json: await res.json().catch(() => {}),
// 		}
// 	}
//
// 	return res
// }
//
// export const login = async () => {
// 	const { json } = await fetchApi('auth/login', {
// 		method: 'post',
// 		body: JSON.stringify(testUser),
// 	})
// 	expect(json.error).toBeUndefined()
// 	expect(json.token).toBeString()
// 	return json.token
// }
//
// export interface FetchFunction {
// 	(path?: string, options?: RequestInit): Promise<{ status: number, json: Record<string, any> }>
// 	(path: string, options: RequestInit, toJson: boolean): Promise<Response>
// }
//
// export const createFetchFunction = async (basePath?: string) => {
// 	const token = await login()
// 	const fetchFunction = (path = '', options = {}, toJson: any) => {
// 		const shouldAddBasePath = basePath && !/^http/.test(path)
// 		const _path = shouldAddBasePath ? `${basePath}/${path}` : path
// 		return fetchApi(_path, options, token, toJson)
// 	}
// 	return fetchFunction as FetchFunction
// }
//
// export const stringifyValues = (object: Record<string, any>) => (
// 	mapValues(object, JSON.stringify) as unknown as Record<string, string>
// )
//
// export const createFormData = (object: any, filename?: string) => (
// 	reduce(object, (result, value, key) => {
// 		const _filename = key === 'file' ? filename : undefined
// 		result.append(key, value, _filename)
// 		return result
// 	}, new FormData())
// )
