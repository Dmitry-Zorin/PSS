import { Shadows } from '@mui/material/styles/shadows'
import 'assets/fonts/Golos-Text/variable.css'
import { range } from 'lodash'
import { RaThemeOptions } from 'react-admin'
import mixins from './mixins'

const hStyle = {
	fontWeight: 700,
}

const commonOptions: RaThemeOptions = {
	mixins,
	shadows: range(25).map(() => 'none') as Shadows,
	shape: {
		borderRadius: 10,
	},
	typography: {
		fontFamily: 'Golos Text, sans-serif',
		fontSize: 16,
		fontWeightRegular: 425,
		h1: hStyle,
		h2: hStyle,
		h3: {
			...hStyle,
			fontSize: '3rem',
		},
		h4: hStyle,
		h5: hStyle,
		h6: hStyle,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: ({ theme }) => ({
					background: 'none',
					backgroundColor: theme.palette.background.paper,
				}),
			},
		},
		MuiCard: {
			styleOverrides: {
				root: ({ theme }) => ({
					background: theme.palette.background.card,
				}),
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
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
				body: ({ theme }) => ({
					borderColor: theme.palette.divider,
				}),
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
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: '0.75rem',
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					padding: '0px 16px',
					'&.RaToolbar-desktopToolbar': {
						background: 'transparent',
					},
				},
			},
		},
	},
}

export default commonOptions
