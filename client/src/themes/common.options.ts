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
		fontFamily: 'Mulish',
		fontSize: 16,
		body1: {
			fontSize: '1.2rem',
		},
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: ({ ownerState }) => {
					if (ownerState.variant?.startsWith('h')) {
						return {
							fontFamily: 'Alumni Sans',
							lineHeight: 1,
							fontWeight: 600,
							background: '-webkit-linear-gradient(45deg, #facefb, #f9cdc3)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}
					}
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					// fontSize: '1rem',
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					// fontSize: '1rem',
				},
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					fontSize: 24,
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
				root: {
					padding: '8px 16px',
					'&.RaDatagrid-headerCell': {
						backgroundColor: 'transparent',
					},
				},
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
					// minWidth: 24,
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
