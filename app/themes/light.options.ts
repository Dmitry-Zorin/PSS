import Color from 'color'
import type { ThemePaletteOptions } from '~/themes'

const PRIMARY = Color('#f53d7a')
const SECONDARY = Color('#EA4C89')
const BG_PRIMARY = Color('#1A202C')
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
	text: {
		primary: TEXT_PRIMARY.string(),
		secondary: TEXT_PRIMARY.lighten(1).string(),
		disabled: TEXT_PRIMARY.lighten(2).string(),
	},
	background: {
		default: '#FFFFFF',
		paper: '#FFFFFF',
		card: BG_PRIMARY.lightness(95).string(),
	},
	divider: TEXT_PRIMARY.alpha(0.1).string(),
	border: TEXT_PRIMARY.alpha(0.1).string(),
}

export default lightOptions
