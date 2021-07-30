import { fetchApi } from '../requests.js'

export let user = JSON.parse(localStorage.getItem('user'))

const authProvider = {
	login: async ({ username, password }) => {
		const options = { method: 'post', body: { username, password } }
		const { json } = await fetchApi('auth/login', options)
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
		const { error } = await fetchApi('auth')
		return error ? Promise.reject() : Promise.resolve()
	},
	
	getPermissions: async () => {
		if (user) return user.isAdmin
		const { json } = await fetchApi('auth/permissions')
		return json.isAdmin
	},
	
	getIdentity: async () => {
		if (!user) {
			const { json } = await fetchApi('auth/identity')
			json.fullName = json.username
			user = json
			localStorage.setItem('user', JSON.stringify(user))
		}
		return user
	},
	
	checkError: ({ status }) => (
		[401, 403].includes(status) ? Promise.reject() : Promise.resolve()
	),
}

export default authProvider
