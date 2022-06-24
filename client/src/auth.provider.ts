import { store } from 'App'
import { AuthProvider, UserIdentity } from 'react-admin'
import { fetchApi, HttpClientOptions } from 'requests'

export interface Permissions {
	isGuest: boolean
	isUser: boolean
	isAdmin: boolean
}

function setAuthToken(token: string) {
	store.setItem('auth.token', token)
}

export function getAuthToken() {
	return store.getItem('auth.token')
}

function fetchAuth(url: string, options?: HttpClientOptions) {
	return fetchApi(`auth/${url}`, options)
}

const authProvider: Required<AuthProvider> = {
	async login({ username, password }) {
		const { json } = await fetchAuth('login', {
			method: 'post',
			body: { username, password },
		})
		if (!json.token) {
			throw null
		}
		setAuthToken(json.token)
	},

	async logout() {},

	async getIdentity() {
		const storedIdentity = store.getItem<UserIdentity | undefined>('identity')
		if (storedIdentity) {
			return storedIdentity
		}
		if (!getAuthToken()) {
			return {
				id: -1,
				role: 'guest',
			}
		}
		const { json: identity }: { json: UserIdentity } = await fetchAuth(
			'identity',
		)
		store.setItem('identity', identity)
		return identity
	},

	async getPermissions() {
		const identity = await authProvider.getIdentity()
		const role = identity.role
		return {
			isGuest: role === 'guest',
			isUser: role === 'user',
			isAdmin: role === 'admin',
		}
	},

	async checkAuth() {
		if (!getAuthToken()) {
			throw null
		}
	},

	async checkError({ status }) {
		if ([401, 403].includes(status)) {
			throw null
		}
	},
}

export default authProvider
