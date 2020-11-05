let userIdentity = {}

const authProvider = {
	login: ({ username, password }) => (
		fetch(`${process.env.SERVER}/api/login`, {
			method: 'POST',
			body: JSON.stringify({ login: username, password }),
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		})
			.then(res => {
				localStorage.setItem('username', username)

				return res.status == 200
					? Promise.resolve()
					: Promise.reject()
			})
			.catch(() => Promise.reject())
	),
	logout: () => (
		fetch(`${process.env.SERVER}/api/logout`, {
			credentials: 'include',
		})
			.then(res => {
				localStorage.clear()
				return res.status == 200
					? Promise.resolve()
					: Promise.reject()
			})
			.catch(() => Promise.reject())
	),
	checkAuth: () => (
		fetch(`${process.env.SERVER}/api/authenticate`, {
			credentials: 'include',
		})
			.then(res => {
				userIdentity = {
					fullName: localStorage.getItem('username')
				}
				return res.status == 200
					? Promise.resolve()
					: Promise.reject()
			})
			.catch(() => Promise.reject())
	),
	getPermissions: () => (
		fetch(`${process.env.SERVER}/api/permissions`, {
			credentials: 'include',
		})
			.then(res => res.json())
			.then(data => Promise.resolve(data.isAdmin))
			.catch(() => Promise.reject())
	),
	getIdentity: () => userIdentity,
	checkError: console.log,
}

export default authProvider