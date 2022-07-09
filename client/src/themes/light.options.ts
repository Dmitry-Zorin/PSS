import Color from 'color'
import { ThemePaletteOptions } from 'themes'

const PRIMARY = Color('#617AFF')
const SECONDARY = Color('#a361ff')
const BG_PRIMARY = Color('#F7F9FF')
const TEXT_PRIMARY = Color('#1A202C')

const lightOptions: ThemePaletteOptions = {
	mode: 'light',
	primary: {
		main: PRIMARY.string(),
	},
	secondary: {
		main: SECONDARY.string(),
	},
	neutral: {
		main: TEXT_PRIMARY.lighten(2).string(),
	},
	gradient: {
		end: '#61ffe7',
		start: SECONDARY.string(),
	},
	text: {
		primary: TEXT_PRIMARY.string(),
		secondary: TEXT_PRIMARY.lighten(2).string(),
		disabled: TEXT_PRIMARY.lighten(3).string(),
	},
	background: {
		default: BG_PRIMARY.lightness(100).string(),
		paper: BG_PRIMARY.string(),
		sidebar: BG_PRIMARY.string(),
		header: BG_PRIMARY.darken(0.0).string(),
	},
	divider: TEXT_PRIMARY.alpha(0.1).string(),
	border: TEXT_PRIMARY.alpha(0.1).string(),
}

export default lightOptions
