import Color from 'color'
import { ThemePaletteOptions } from 'themes'

const PRIMARY = Color('#FFD4FF')
const TEXT_PRIMARY = Color('#FFFFFF')
const BG_DEFAULT = Color('#171A23')
const GRAY = Color('#868991')

const darkOptions: ThemePaletteOptions = {
	mode: 'dark',
	primary: {
		main: PRIMARY.string(),
	},
	secondary: {
		main: GRAY.string(),
	},
	text: {
		primary: TEXT_PRIMARY.string(),
		medium: TEXT_PRIMARY.alpha(0.8).string(),
		secondary: TEXT_PRIMARY.alpha(0.6).string(),
		disabled: TEXT_PRIMARY.alpha(0.4).string(),
	},
	background: {
		default: BG_DEFAULT.string(),
		paper: BG_DEFAULT.lighten(0.25).string(),
		sidebar: BG_DEFAULT.mix(PRIMARY, 0.025).string(),
		header: BG_DEFAULT.mix(PRIMARY, 0.02).string(),
		// header: BG_DEFAULT.string(),
	},
	divider: TEXT_PRIMARY.alpha(0.1).string(),
	border: TEXT_PRIMARY.alpha(0.05).string(),
}

export default darkOptions
