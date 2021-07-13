import { fetchAPI } from '../../utils/utils'

const getPromise = (status) => (
	Promise[status === 200 ? 'resolve' : 'reject']()
)

const authProvider = {
	user: JSON.parse(localStorage.getItem('user')),
	login: async ({ username, password }) => {
		const { status } = await fetchAPI('login', {
			method: 'POST',
			body: JSON.stringify({ login: username, password }),
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
		return getPromise(status)
	},
	logout: async () => {
		if (!authProvider.user) {
			return Promise.resolve()
		}
		localStorage.clear()
		const { status } = await fetchAPI('logout')
		return getPromise(status)
	},
	checkAuth: async () => {
		const { status } = await fetchAPI('authenticate')
		return getPromise(status)
	},
	getPermissions: async () => {
		if (authProvider.user) {
			return authProvider.user.isAdmin
		}
		const { json } = await fetchAPI('permissions')
		return json.isAdmin
	},
	getIdentity: async () => {
		if (authProvider.user) {
			return authProvider.user
		}
		const { json } = await fetchAPI('identity')
		authProvider.user = json
		return json
	},
	checkError: ({ status }) => (
		Promise[[401, 403].includes(status) ? 'reject' : 'resolve']()
	),
}

export default authProvider
