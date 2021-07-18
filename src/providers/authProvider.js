import { fetchAPI } from '../requests.js'

export let user = JSON.parse(localStorage.getItem('user'))

export default {
	login: async ({ username, password }) => {
		const options = { method: 'post', body: { username, password } }
		const { json } = await fetchAPI('auth/login', options)
		if (json?.token) {
			localStorage.setItem('token', json.token)
			return Promise.resolve()
		}
		return Promise.reject()
	},
	logout: () => {
		localStorage.clear()
		return Promise.resolve()
	},
	checkAuth: async () => {
		const { error } = await fetchAPI('auth')
		return error ? Promise.reject() : Promise.resolve()
	},
	getPermissions: async () => {
		if (user) return user.isAdmin
		const { json } = await fetchAPI('auth/permissions')
		return json.isAdmin
	},
	getIdentity: async () => {
		if (!user) {
			const { json } = await fetchAPI('auth/identity')
			json.fullName = json.username
			user = json
		}
		return user
	},
	checkError: ({ status }) => (
		[401, 403].includes(status) ? Promise.reject() : Promise.resolve()
	),
}
