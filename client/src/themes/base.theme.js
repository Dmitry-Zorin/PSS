import { createTheme } from '@mui/material'
import { range } from 'lodash'

const APP_BAR_HEIGHT = 54
const BORDER_RADIUS = 8
const MAX_WIDTH = 700
const SIDEBAR_WIDTH = 300
const SIDEBAR_CLOSED_WIDTH = APP_BAR_HEIGHT
const MENU_ITEM_MARGIN = 5
const BORDER_SIZE = 1
const ICON_SIZE = 24
const SPACING = 8

const primaryHeight = APP_BAR_HEIGHT - 2 * MENU_ITEM_MARGIN

export const defaultTheme = createTheme()

export const baseTheme = {
	typography: {
		fontFamily: '"Open Sans", sans-serif',
	},
	shape: {
		borderRadius: BORDER_RADIUS,
	},
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
				sizeSmall: {
					transform: 'scale(0.93)',
					fontSize: '0.85rem',
				},
			},
		},
		MuiTableRow: {
			styleOverrides: {
				root: {
					height: APP_BAR_HEIGHT - MENU_ITEM_MARGIN + BORDER_SIZE,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					height: primaryHeight,
					width: primaryHeight,
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
		RaCreateButton: {
			styleOverrides: {
				root: {
					'&.RaCreateButton-floating': {
						bottom: 3 * SPACING,
						right: 3 * SPACING,
					},
				},
			},
		},
		RaLayout: {
			styleOverrides: {
				root: {
					'.RaLayout-appFrame': {
						[defaultTheme.breakpoints.up('sm')]: {
							marginTop: APP_BAR_HEIGHT + BORDER_SIZE,
						},
						[defaultTheme.breakpoints.down('sm')]: {
							marginTop: 0,
							marginBottom: APP_BAR_HEIGHT + BORDER_SIZE,
						},
					},
					'.layout-container, .RaCreate-main, .RaEdit-main, .RaShow-main': {
						margin: 'auto',
						maxWidth: MAX_WIDTH,
						[`@media (min-width:${
							MAX_WIDTH + 3 * SIDEBAR_WIDTH + 5 * SPACING
						}px)`]: {
							marginLeft: SIDEBAR_WIDTH,
						},
					},
				},
			},
		},
		RaSidebar: {
			styleOverrides: {
				root: {
					height: 'auto',
					borderRight: `1px solid`,
				},
			},
		},
		RaLabeled: {
			styleOverrides: {
				root: {
					'.RaLabeled-label': {
						fontSize: '0.95rem',
						fontWeight: 450,
					},
				},
			},
		},
		RaAppBar: {
			styleOverrides: {
				root: {
					borderTop: '1px solid',
					borderBottom: '1px solid',
					svg: {
						fontSize: ICON_SIZE,
					},
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					fontWeight: 400,
					borderRadius: BORDER_RADIUS,
					margin: MENU_ITEM_MARGIN,
					height: primaryHeight,
					padding: `${
						(APP_BAR_HEIGHT - ICON_SIZE) / 2 - MENU_ITEM_MARGIN - BORDER_SIZE
					}px ${
						(SIDEBAR_CLOSED_WIDTH - ICON_SIZE) / 2 -
						MENU_ITEM_MARGIN -
						BORDER_SIZE
					}px`,
					border: `${BORDER_SIZE}px solid transparent`,
				},
			},
		},
	},
}
