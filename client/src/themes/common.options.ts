import { Shadows } from '@mui/material/styles/shadows'
import { range } from 'lodash'
import { RaThemeOptions } from 'react-admin'
import mixins from './mixins'

const commonOptions: RaThemeOptions = {
	mixins,
	shadows: range(25).map(() => 'none') as Shadows,
	shape: {
		borderRadius: 8,
	},
	sidebar: {
		width: 300,
		closedWidth: 54,
	},
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
			fontWeight: 450,
			// lineHeight: 1.6,
		},
	},
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
					transition: 'none',
				},
			},
		},
	},
}

export default commonOptions
