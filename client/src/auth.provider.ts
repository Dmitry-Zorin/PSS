import { AuthProvider } from 'react-admin'
import { fetchApi, HttpClientOptions } from 'requests'
import { getToken, getUser, Role, setToken } from 'user'

function fetchAuth(url: string, options?: HttpClientOptions) {
	return fetchApi(`auth/${url}`, options)
}

export interface Permissions {
	isGuest: boolean
	isUser: boolean
	isAdmin: boolean
}

const authProvider: AuthProvider = {
	async login({ username, password }) {
		const { json } = await fetchAuth('login', {
			method: 'post',
			body: { username, password },
		})
		if (!json.token) {
			throw null
		}
		setToken(json.token)
	},

	logout() {
		localStorage.clear()
		return Promise.resolve()
	},

	getPermissions() {
		const { role } = getUser()
		return Promise.resolve({
			isGuest: role === Role.Guest,
			isUser: role === Role.User,
			isAdmin: role === Role.Admin,
		})
	},

	async checkAuth() {
		if (!getToken()) {
			throw null
		}
	},

	async checkError({ status }) {
		const isAuthError = [401, 403].includes(status)
		const { isGuest } = await authProvider.getPermissions(null)
		if (isAuthError && !isGuest) {
			throw null
		}
	},
}

export default authProvider
