import { baseTheme } from './base.theme'
import { darkTheme } from './dark.theme'
import { lightTheme } from './light.theme'

export const Theme = {
	Base: 'base',
	Light: 'light',
	Dark: 'dark',
}

export default {
	[Theme.Base]: baseTheme,
	[Theme.Light]: lightTheme,
	[Theme.Dark]: darkTheme,
}
