import { indigo } from '@mui/material/colors'
import { ThemePaletteOptions } from 'themes'

const BACKGROUND = '#F2F4F9'
const SIDEBAR_BACKGROUND = '#ebedf5f5'

const lightOptions: ThemePaletteOptions = {
	mode: 'light',
	primary: {
		light: indigo[400],
		main: indigo[500],
		dark: indigo[600],
	},
	text: {
		primary: '#202c44',
	},
	background: {
		default: BACKGROUND,
		paper: BACKGROUND,
		sidebar: SIDEBAR_BACKGROUND,
	},
}

export default lightOptions
