import Color from 'color'
import { ThemePaletteOptions } from 'themes'

const PRIMARY = Color('#f53d7a')
const SECONDARY = Color('#4001FF')
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
	text: {
		primary: TEXT_PRIMARY.string(),
		secondary: TEXT_PRIMARY.darken(0.2).string(),
		disabled: TEXT_PRIMARY.darken(0.4).string(),
	},
	background: {
		default: BG_PRIMARY.string(),
		paper: BG_PRIMARY.string(),
		card: BG_PRIMARY.lighten(0.5).desaturate(0.3).string(),
	},
	divider: TEXT_PRIMARY.alpha(0.1).string(),
	border: TEXT_PRIMARY.alpha(0.1).string(),
}

export default darkOptions
