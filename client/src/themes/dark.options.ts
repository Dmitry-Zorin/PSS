import Color from 'color'
import { ThemePaletteOptions } from 'themes'

const PRIMARY = Color('#A5CF7C')
const SECONDARY = Color('#99BBFF')
const BG_PRIMARY = Color('#1A202C')
const TEXT_PRIMARY = Color('#FFFFFF')

const darkOptions: ThemePaletteOptions = {
	mode: 'dark',
	primary: {
		main: PRIMARY.string(),
	},
	secondary: {
		main: SECONDARY.string(),
	},
	neutral: {
		main: TEXT_PRIMARY.darken(0.25).string(),
	},
	gradient: {
		start: '#cf7c7c',
		end: '#cf7ccf',
	},
	text: {
		primary: TEXT_PRIMARY.string(),
		secondary: TEXT_PRIMARY.darken(0.2).string(),
		disabled: TEXT_PRIMARY.darken(0.4).string(),
	},
	background: {
		default: BG_PRIMARY.string(),
		paper: BG_PRIMARY.string(),
		sidebar: BG_PRIMARY.lighten(0.1).string(),
		header: BG_PRIMARY.lighten(0.05).string(),
	},
	divider: TEXT_PRIMARY.alpha(0.075).string(),
	border: TEXT_PRIMARY.alpha(0.05).string(),
}

export default darkOptions
