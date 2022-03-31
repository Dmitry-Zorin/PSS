import { fetchApi } from '../requests'

export const getUser = () => (
	JSON.parse(localStorage.getItem('user'))
)

export const setUser = (user) => (
	localStorage.setItem('user', JSON.stringify(user))
)

const authProvider = {
	login: async ({ username, password }) => {
		const options = { method: 'post', body: { username, password } }
		const { json } = await fetchApi('auth/login', options)
		if (json?.token) {
			localStorage.setItem('token', json.token)
			const { json: user } = await fetchApi('auth/identity')
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
		const { error } = await fetchApi('auth', { method: 'post' })
		return error ? Promise.reject() : Promise.resolve()
	},

	getPermissions: async () => {
		const user = getUser()
		if (user) {
			return user.role === 'admin'
		}
		const { json } = await fetchApi('auth/permissions')
		return json.role === 'admin'
	},

	getIdentity: async () => {
		const user = getUser()
		return user
	},

	checkError: ({ status }) => (
		[401, 403].includes(status) ? Promise.reject() : Promise.resolve()
	),
}

export default authProvider
