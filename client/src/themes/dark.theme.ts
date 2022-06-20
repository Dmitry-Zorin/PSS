import { lightGreen } from '@mui/material/colors'
import { merge } from 'lodash'
import { ThemeOptionsExtended } from 'themes'
import common from './common'

const BACKGROUND = '#23272E'

const themeOptions: ThemeOptionsExtended = {
	palette: {
		mode: 'dark',
		primary: {
			light: lightGreen[300],
			main: lightGreen[400],
			dark: lightGreen[500],
		},
		background: {
			default: BACKGROUND,
			paper: BACKGROUND,
		},
	},
}

const darkTheme = merge({}, common, themeOptions)

export default darkTheme
