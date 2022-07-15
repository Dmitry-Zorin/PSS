export type Role = 'guest' | 'user' | 'admin'
export type Locale = 'en' | 'ru'
export type ThemeMode = 'light' | 'dark'

export interface Settings {
	locale: Locale
	theme: ThemeMode
}

declare module 'react-admin' {
	interface UserIdentity {
		role: Role
		settings?: Settings
	}
}