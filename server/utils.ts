import bcrypt from 'bcrypt'
import { pickBy } from 'lodash'
import fetch, { RequestInit } from 'node-fetch'

export const removeFalsyProps = (object: object) => (
	pickBy(object, Boolean)
)

export const projectTruthyProps = (object: object, projection: any) => (
	pickBy(object, (value, key) => projection[key] && value)
)

export const generatePassword = (password: string, salt = 10) => (
	!password ? '' : bcrypt.hash(password, salt).catch(() => '')
)

export const isCorrectPassword = (password: string, hash: string) => (
	bcrypt.compare(password, hash).catch(() => false)
)

export const fetchAPI = async (resourceUrl: string, token: string, options: RequestInit = {}) => {
	const { SERVER } = process.env
	
	if (!SERVER) {
		throw new Error('Missing server env parameter')
	}
	
	const resp = await fetch(`${SERVER}/api/${resourceUrl}`, {
		...options,
		headers: {
			...token && { 'Authorization': `Bearer ${token}` },
			...options.headers,
		},
	})
	return {
		status: resp.status,
		json: await resp.json().catch(() => ({})),
	}
}
