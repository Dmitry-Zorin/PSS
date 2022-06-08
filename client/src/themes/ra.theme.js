import { APP_BAR_HEIGHT, BORDER_RADIUS, muiTheme } from './mui.theme'

const MAX_WIDTH = 700
const SIDEBAR_WIDTH = 270
const SIDEBAR_CLOSED_WIDTH = APP_BAR_HEIGHT
const MENU_ITEM_MARGIN = 4
const BORDER_SIZE = 1
const ICON_SIZE = 24

export const raTheme = {
	sidebar: {
		width: SIDEBAR_WIDTH,
		closedWidth: SIDEBAR_CLOSED_WIDTH,
	},
	components: {
		RaLayout: {
			styleOverrides: {
				root: {
					'.layout-container, .RaCreate-main, .RaEdit-main, .RaShow-main': {
						margin: 'auto',
						maxWidth: MAX_WIDTH,
						[`@media (min-width:${MAX_WIDTH + 3 * SIDEBAR_WIDTH + 40}px)`]: {
							marginLeft: SIDEBAR_WIDTH,
						},
					},
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
					'& button, a': {
						color: 'inherit',
						height: 48,
						minWidth: 48,
						borderRadius: 50,
					},
					'& svg': {
						fontSize: '24px !important',
					},
				},
			},
		},
		RaSidebar: {
			styleOverrides: {
				root: {
					borderRight: `1px solid ${muiTheme.palette.divider}`,
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					fontWeight: 400,
					borderRadius: BORDER_RADIUS,
					margin: MENU_ITEM_MARGIN,
					height: APP_BAR_HEIGHT - 2 * MENU_ITEM_MARGIN,
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
