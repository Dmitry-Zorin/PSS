import { ThemeOptions } from '@mui/material'
import { Shadows } from '@mui/material/styles/shadows'
import { range } from 'lodash'
import constants from './constants'
import mixins from './mixins'

const common: ThemeOptions = {
	...constants,
	mixins,
	typography: {
		fontFamily: 'MontserratVariable, sans-serif',
		h4: {
			fontWeight: 900,
		},
		h5: {
			fontWeight: 700,
		},
		h6: {
			fontWeight: 700,
		},
		body1: {
			lineHeight: 1.6,
		},
	},
	shape: {
		borderRadius: 8,
	},
	spacing: 8,
	shadows: range(25).map(() => 'none') as Shadows,
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					background: 'none',
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					height: 44,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					height: 42,
					width: 42,
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					minWidth: 24,
				},
			},
		},
	},
}

export default common
