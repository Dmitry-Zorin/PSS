import Color from 'color'
import { ThemePaletteOptions } from 'themes'

const PRIMARY = Color('#FFD4FF')
const TEXT_PRIMARY = Color('#171A23')
const BG_DEFAULT = Color('#FFFFFF')
const GRAY = Color('#868991')

const lightOptions: ThemePaletteOptions = {
	mode: 'light',
	primary: {
		main: PRIMARY.string(),
	},
	secondary: {
		main: GRAY.string(),
	},
	text: {
		primary: TEXT_PRIMARY.string(),
		secondary: TEXT_PRIMARY.alpha(0.75).string(),
		disabled: TEXT_PRIMARY.alpha(0.5).string(),
	},
	background: {
		default: BG_DEFAULT.string(),
		paper: BG_DEFAULT.darken(0.4).string(),
		sidebar: BG_DEFAULT.darken(0.4).string(),
		header: BG_DEFAULT.darken(0.6).string(),
	},
	divider: TEXT_PRIMARY.alpha(0.25).string(),
	border: TEXT_PRIMARY.alpha(0.05).string(),
}

export default lightOptions
