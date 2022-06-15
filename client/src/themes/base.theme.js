import shadows from '@mui/material/styles/shadows'
import { range } from 'lodash'

export const APP_BAR_HEIGHT = 54
export const BORDER_RADIUS = 8
export const SIDEBAR_WIDTH = 300
export const SIDEBAR_CLOSED_WIDTH = 54
export const SPACING = 8

const MAIN_AREA_MAX_WIDTH = 700
const MAIN_AREA_PADDING_X = 16

export const baseTheme = {
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
		borderRadius: BORDER_RADIUS,
	},
	spacing: SPACING,
	shadows: range(25).map(() => 'none'),
	sidebar: {
		width: SIDEBAR_WIDTH,
		closedWidth: SIDEBAR_CLOSED_WIDTH,
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
				},
			},
		},
		MuiFab: {
			styleOverrides: {
				root: {
					'&, &:active': {
						boxShadow: shadows[4],
					},
				},
			},
		},
	},
	mixins: {
		shadows,
		appBar: {
			height: APP_BAR_HEIGHT,
		},
		mainArea: {
			maxWidth: MAIN_AREA_MAX_WIDTH,
			padding: `0 ${MAIN_AREA_PADDING_X}px`,
			marginLeft: 'auto',
			marginRight: 'auto',
			// marginRight: `max(0px, calc(50vw - ${MAIN_AREA_MAX_WIDTH / 2}px - ${
			// 	MAIN_AREA_PADDING_X + 2 * SPACING
			// }px))`,
		},
	},
}
