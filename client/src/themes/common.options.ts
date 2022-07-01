import { Shadows } from '@mui/material/styles/shadows'
import { range } from 'lodash'
import { RaThemeOptions } from 'react-admin'
import mixins from './mixins'

const commonOptions: RaThemeOptions = {
	mixins,
	shadows: range(25).map(() => 'none') as Shadows,
	shape: {
		borderRadius: 4,
	},
	typography: {
		fontFamily: 'MontserratVariable, sans-serif',
		fontWeightRegular: 500,
		h4: {
			fontWeight: 900,
		},
		h5: {
			fontWeight: 800,
		},
		h6: {
			fontWeight: 700,
		},
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					height: 64,
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					height: 50,
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				head: ({ theme }) => ({
					borderColor: theme.palette.divider,
				}),
				body: {
					borderColor: 'transparent',
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: 8,
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: ({ theme }) => ({
					minWidth: 24,
					transition: 'none',
					color: theme.palette.text.contrast,
					// backgroundColor: theme.palette.divider,
					fontWeight: theme.typography.fontWeightRegular,
				}),
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					transition: 'none',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				list: ({ theme }) => ({
					color: theme.palette.text.contrast,
					// backgroundColor: theme.palette.divider,
				}),
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: ({ theme }) => ({
					fontSize: '0.75rem',
					color: theme.palette.text.contrast,
					// backgroundColor: theme.palette.divider,
				}),
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					'&.RaToolbar-desktopToolbar': {
						backgroundColor: 'transparent',
					},
				},
			},
		},
	},
}

export default commonOptions
