import { Locale } from 'i18n/messages'
import { Theme } from 'themes'

export const Roles = {
	guest: 'guest',
	user: 'user',
	admin: 'admin',
}

export const guest = {
	role: Roles.guest,
	settings: {
		locale: Locale.En,
		theme: Theme.Dark,
	},
}

export function getUser() {
	return JSON.parse(localStorage.getItem('user'))
}

export function setUser(user) {
	localStorage.setItem('user', JSON.stringify(user))
}
