import { lightGreen } from '@mui/material/colors'
import { merge } from 'lodash'
import { baseTheme } from './base.theme'
import { alpha } from '@mui/material'

const BACKGROUND = '#272C34'

export const darkTheme = merge({}, baseTheme, {
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
	mixins: {
		appBar: {
			background: alpha(BACKGROUND, 0.85),
		},
	},
})
