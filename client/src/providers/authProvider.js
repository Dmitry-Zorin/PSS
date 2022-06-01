import { fetchApi } from '../requests'
import { getUser, setUser } from '../user'

const fetchAuth = (url, options) => fetchApi(`auth/${url}`, options)

const authProvider = {
	login: async ({ username, password }) => {
		const { json } = await fetchAuth('login', {
			method: 'post',
			body: { username, password },
		})

		if (json?.token) {
			localStorage.setItem('token', json.token)
			const { json: user } = await fetchAuth('identity')
			user.fullName = user.username
			setUser(user)
			return Promise.resolve()
		}

		return Promise.reject()
	},

	logout: () => {
		localStorage.clear()
		return Promise.resolve()
	},

	checkAuth: async () => {
		const token = localStorage.getItem('token')
		return token ? Promise.resolve() : Promise.reject()
	},

	getPermissions: async () => {
		const user = getUser()
		if (user) {
			return user.role === 'admin'
		}
		const { json } = await fetchAuth('permissions')
		return json.role === 'admin'
	},

	getIdentity: async () => {
		return getUser()
	},

	checkError: ({ status }) => {
		const isAuthError = [401, 403].includes(status)
		return isAuthError ? Promise.reject() : Promise.resolve()
	},
}

export default authProvider
