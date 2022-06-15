import { alpha } from '@mui/material'
import { common, indigo } from '@mui/material/colors'
import { merge } from 'lodash'
import { baseTheme } from './base.theme'

const BACKGROUND = common.white

export const lightTheme = merge({}, baseTheme, {
	mode: 'light',
	palette: {
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
	mixins: {
		appBar: {
			background: alpha(BACKGROUND, 0.6),
		},
	},
})
