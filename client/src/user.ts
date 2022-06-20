export enum Role {
	Guest = 'guest',
	User = 'user',
	Admin = 'admin',
}

export enum Locale {
	En = 'en',
	Ru = 'ru',
}

export enum ThemeMode {
	Light = 'light',
	Dark = 'dark',
}

export interface Settings {
	locale: Locale
	theme: ThemeMode
}

export interface User {
	id?: string
	role: Role
	settings: Settings
}

export const GUEST: Readonly<User> = {
	role: Role.Guest,
	settings: {
		locale: Locale.En,
		theme: ThemeMode.Dark,
	},
}

export function getToken() {
	return localStorage.getItem('JWT')
}

export function setToken(token: string) {
	localStorage.setItem('JWT', token)
}

export function getUser() {
	const user = localStorage.getItem('user')
	if (!user) {
		setUser(GUEST)
		return GUEST
	}
	return JSON.parse(user) as User
}

export function setUser(user: User) {
	localStorage.setItem('user', JSON.stringify(user))
}
