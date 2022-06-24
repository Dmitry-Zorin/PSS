import { indigo } from '@mui/material/colors'
import { ThemePaletteOptions } from 'themes'

const BACKGROUND = '#FFFFFF'

const lightOptions: ThemePaletteOptions = {
	mode: 'light',
	primary: {
		main: indigo[600],
	},
	text: {
		primary: '#22272C',
	},
	background: {
		default: BACKGROUND,
		paper: BACKGROUND,
		sidebar: BACKGROUND,
	},
}

export default lightOptions
