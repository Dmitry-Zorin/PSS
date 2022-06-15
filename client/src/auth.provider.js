import { fetchApi } from 'requests'
import { getUser, Roles, setUser } from 'user'

function fetchAuth(url, options) {
	return fetchApi(`auth/${url}`, options)
}

const authProvider = {
	login: async ({ username, password }) => {
		const { json } = await fetchAuth('login', {
			method: 'post',
			body: { username, password },
		})

		if (json?.token) {
			localStorage.setItem('token', json.token)
			const { json: user } = await fetchAuth('identity')
			setUser(user)
			return
		}

		throw null
	},

	logout: async () => {
		localStorage.clear()
	},

	checkAuth: async () => {
		const { isGuest } = await authProvider.getPermissions()
		if (!isGuest && !localStorage.getItem('token')) {
			throw null
		}
	},

	getPermissions: async () => {
		const { role } = getUser()
		return {
			role,
			isGuest: role === Roles.guest,
			isUser: role === Roles.user,
			isAdmin: role === Roles.admin,
		}
	},

	checkError: async ({ status }) => {
		const isAuthError = [401, 403].includes(status)
		const { isGuest } = await authProvider.getPermissions()
		if (isAuthError && !isGuest) {
			throw null
		}
	},
}

export default authProvider
