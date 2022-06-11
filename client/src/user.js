export const Roles = {
	guest: 'guest',
	user: 'user',
	admin: 'admin',
}

export const guest = {
	role: Roles.guest,
	settings: {
		locale: 'en',
		theme: 'dark',
	},
}

export function getUser() {
	return JSON.parse(localStorage.getItem('user'))
}

export function setUser(user) {
	localStorage.setItem('user', JSON.stringify(user))
}
