import { range } from 'lodash'

export const APP_BAR_HEIGHT = 50
export const BORDER_RADIUS = 8

const BACKUP_FONTS =
	'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

export const muiTheme = {
	typography: {
		fontFamily: `"Nunito", ${BACKUP_FONTS}`,
	},
	palette: {
		divider: 'rgba(0, 0, 0, 0.08)',
	},
	shape: {
		borderRadius: BORDER_RADIUS,
	},
	shadows: range(25).map(() => 'none'),
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 550,
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				body2: {
					fontSize: '1.1rem',
					fontWeight: 350,
				},
			},
		},
		MuiToolbar: {
			styleOverrides: {
				dense: {
					height: APP_BAR_HEIGHT,
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				labelMedium: {
					fontSize: '1rem',
					fontWeight: 350,
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					height: 46,
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {},
			},
		},
	},
}
