import Color from 'color'
import { ThemePaletteOptions } from 'themes'

const PRIMARY = Color('#FFCCFF')
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
		secondary: TEXT_PRIMARY.alpha(0.75).string(),
		disabled: TEXT_PRIMARY.alpha(0.5).string(),
	},
	background: {
		default: BG_DEFAULT.string(),
		paper: BG_DEFAULT.mix(TEXT_PRIMARY, 0.08).string(),
		sidebar: BG_DEFAULT.mix(TEXT_PRIMARY, 0.08).string(),
		header: BG_DEFAULT.mix(TEXT_PRIMARY, 0.12).string(),
	},
	divider: TEXT_PRIMARY.alpha(0.1).string(),
	border: TEXT_PRIMARY.alpha(0.1).string(),
}

export default darkOptions
