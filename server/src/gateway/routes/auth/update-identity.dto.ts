import { Locale, Theme } from '../../types'

export class UpdateIdentityDto {
	username?: string
	password?: string
	locale?: Locale
	theme?: Theme
}
