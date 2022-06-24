import { lightGreen } from '@mui/material/colors'
import { ThemePaletteOptions } from 'themes'

const BACKGROUND = '#242936'
const SIDEBAR_BACKGROUND = '#1f2430'

const darkOptions: ThemePaletteOptions = {
	mode: 'dark',
	primary: {
		light: lightGreen[300],
		// main: lightGreen.A100,
		// main: amber.A100,
		main: '#ffcc66',
		dark: lightGreen[500],
	},
	text: {
		primary: '#cccac2',
	},
	background: {
		default: BACKGROUND,
		paper: BACKGROUND,
		sidebar: SIDEBAR_BACKGROUND,
	},
}

export default darkOptions
