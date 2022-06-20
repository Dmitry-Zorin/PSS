import { indigo } from '@mui/material/colors'
import { merge } from 'lodash'
import { ThemeOptionsExtended } from 'themes'
import common from './common'

const BACKGROUND = '#F6F8FA'

const themeOptions: ThemeOptionsExtended = {
	palette: {
		mode: 'light',
		primary: {
			light: indigo[400],
			main: indigo[500],
			dark: indigo[600],
		},
		background: {
			default: BACKGROUND,
			paper: BACKGROUND,
		},
	},
}

const lightTheme = merge({}, common, themeOptions)

export default lightTheme
