import { range } from 'lodash'

export const APP_BAR_HEIGHT = 54
export const BORDER_RADIUS = 8
export const SIDEBAR_WIDTH = 300
export const SIDEBAR_CLOSED_WIDTH = 54
export const ICON_SIZE = 24
export const SPACING = 8

const MAX_WIDTH = 700
const PADDING_X = 4

export const baseTheme = {
	typography: {
		fontFamily: 'Nunito Sans, sans-serif',
		h4: {
			fontSize: '2rem',
			fontWeight: 900,
		},
		h5: {
			fontWeight: 700,
		},
		h6: {
			fontWeight: 700,
		},
	},
	shape: {
		borderRadius: BORDER_RADIUS,
	},
	spacing: SPACING,
	shadows: range(25).map(() => 'none'),
	sidebar: {
		width: SIDEBAR_WIDTH,
		closedWidth: SIDEBAR_CLOSED_WIDTH,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					background: 'none',
				},
			},
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontWeight: 600,
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
					height: 40,
					width: 40,
					margin: 2,
					borderRadius: ICON_SIZE,
				},
			},
		},
		MuiFab: {
			styleOverrides: {
				root: {
					width: 2 * ICON_SIZE,
					height: 2 * ICON_SIZE,
				},
			},
		},
	},
	mixins: {
		appBar: {
			height: APP_BAR_HEIGHT,
		},
		mainArea: {
			maxWidth: MAX_WIDTH,
			padding: `0 ${PADDING_X}`,
			marginLeft: 'auto',
			marginRight: `max(0px, calc(50vw - ${MAX_WIDTH / 2}px - ${
				(PADDING_X + 2) * SPACING
			}px))`,
		},
	},
}
