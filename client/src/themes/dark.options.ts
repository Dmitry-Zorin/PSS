import Color from 'color'
import { ThemePaletteOptions } from 'themes'

const PRIMARY = Color('#B3BFFF')
const TEXT_PRIMARY = Color('#FFFFFF')
const BG_DEFAULT = Color('#171923')

const darkOptions: ThemePaletteOptions = {
	mode: 'dark',
	primary: {
		main: PRIMARY.string(),
	},
	text: {
		primary: TEXT_PRIMARY.string(),
		medium: TEXT_PRIMARY.alpha(0.8).string(),
		secondary: TEXT_PRIMARY.alpha(0.6).string(),
		disabled: TEXT_PRIMARY.alpha(0.4).string(),
	},
	background: {
		default: BG_DEFAULT.string(),
		paper: BG_DEFAULT.mix(PRIMARY, 0.05).string(),
		sidebar: BG_DEFAULT.mix(PRIMARY, 0.05).string(),
		header: BG_DEFAULT.mix(PRIMARY, 0.1).string(),
	},
	divider: TEXT_PRIMARY.alpha(0.15).string(),
}

export default darkOptions
