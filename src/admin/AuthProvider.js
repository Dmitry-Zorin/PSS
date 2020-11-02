const authProvider = {

	login: ({ username, password }) => {
		return fetch(`${process.env.SERVER}/api/login`, {
			method: 'POST',
			body: JSON.stringify({ login: username, password }),
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(response => {
				return response.status == 200
					? Promise.resolve()
					: Promise.reject()
			})
			.catch(() => Promise.reject())
	},

	logout: () => {
		return fetch(`${process.env.SERVER}/api/logout`, {
			credentials: 'include',
		})
			.then(response => {
				return response.status == 200
					? Promise.resolve()
					: Promise.reject()
			})
			.catch(() => Promise.reject())
	},

	checkAuth: () => {
		return fetch(`${process.env.SERVER}/api/authenticate`, {
			credentials: 'include',
		})
			.then(response => {
				return response.status == 200
					? Promise.resolve()
					: Promise.reject()
			})
			.catch(() => Promise.reject())
	},

	getPermissions: () => {
		return fetch(`${process.env.SERVER}/api/permissions`, {
			credentials: 'include',
		})
			.then(response => response.json())
			.then(data => Promise.resolve(data.isAdmin))
			.catch(() => Promise.reject())
	},

	checkError: (error) => {
		console.log(error)
	},
}

export default authProvider