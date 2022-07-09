import { Shadows } from '@mui/material/styles/shadows'
import { range } from 'lodash'
import { RaThemeOptions } from 'react-admin'
import mixins from './mixins'

const hStyles = {
	fontFamily: 'Alumni Sans',
	lineHeight: 1,
	fontWeight: 700,
}

const commonOptions: RaThemeOptions = {
	mixins,
	shadows: range(25).map(() => 'none') as Shadows,
	shape: {
		borderRadius: 4,
	},
	typography: {
		fontFamily: 'Mulish',
		fontSize: 15,
		h1: hStyles,
		h2: hStyles,
		h3: hStyles,
		h4: hStyles,
		h5: hStyles,
		h6: hStyles,
		body2: {
			fontSize: '1rem',
		},
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: ({ theme }) => ({
					border: '1px solid',
					borderColor: theme.palette.border,
				}),
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					// padding: '8px 16px',
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					...(ownerState.variant === 'body1' &&
						{
							// fontSize: '1.2rem',
						}),
					...(ownerState.variant?.startsWith('h') && {
						color: theme.palette.text.secondary,
					}),
					...(ownerState.component === 'h1' && {
						background: `-webkit-linear-gradient(60deg, ${theme.palette.gradient.start}, ${theme.palette.gradient.end})`,
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
					}),
				}),
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
						background: 'transparent',
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
				},
				sizeSmall: {
					padding: 6,
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: ({ theme }) => ({
					// transition: 'none',
				}),
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 600,
					// transition: 'none',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				list: ({ theme }) => ({}),
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: ({ theme }) => ({
					fontSize: '0.75rem',
				}),
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					'&.RaToolbar-desktopToolbar': {
						background: 'transparent',
					},
				},
			},
		},
	},
}

export default commonOptions
