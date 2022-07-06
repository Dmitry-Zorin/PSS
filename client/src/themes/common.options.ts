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
		fontFamily: 'Nunito Sans',
		fontSize: 17,
		h1: {
			fontFamily: 'Alumni Sans',
			lineHeight: 1,
			fontWeight: 600,
		},
		h2: {
			fontFamily: 'Alumni Sans',
			fontWeight: 600,
			lineHeight: 1,
		},
		h3: {
			fontFamily: 'Alumni Sans',
			lineHeight: 1,
			fontWeight: 600,
		},
		h4: {
			fontFamily: 'Alumni Sans',
			lineHeight: 1,
			fontWeight: 600,
		},
		h5: {
			fontFamily: 'Alumni Sans',
			lineHeight: 1,
			fontWeight: 600,
		},
		h6: {
			fontFamily: 'Alumni Sans',
			lineHeight: 1,
			fontWeight: 600,
		},
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					fontSize: '1.4rem',
				},
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
					// borderRadius: 16,
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: ({ theme }) => ({
					minWidth: 24,
					transition: 'none',
					// color: theme.palette.text.contrast,
					// backgroundColor: theme.palette.divider,
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
					// color: theme.palette.text.contrast,
					// backgroundColor: theme.palette.divider,
				}),
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: ({ theme }) => ({
					fontSize: '0.75rem',
					// color: theme.palette.text.contrast,
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
