import { ThemePaletteOptions } from 'themes'

// https://coolors.co/4d6fd6-424b66-6f768b-c8cbd5-f5f6fa

const BACKGROUND = '#FFFFFF'

const lightOptions: ThemePaletteOptions = {
	mode: 'light',
	primary: {
		main: '#3366FF',
	},
	text: {
		primary: '#262A33',
		secondary: '#6F768B',
		contrast: '#32384D',
	},
	background: {
		default: BACKGROUND,
		paper: BACKGROUND,
		sidebar: BACKGROUND,
	},
	divider: '#C8CBD5',
}

export default lightOptions
