import { appbarHeight, borderRadius } from './mui.theme'

const menuItemMargin = 4

const raViewStyle = {
	styleOverrides: {
		root: {
			width: '100%',
			maxWidth: '1250px !important',
			margin: '0 auto',
		},
	},
}

const raLayoutStyle = {
	styleOverrides: {
		root: {
			padding: '15px 40px',
		},
	},
}

const raTheme = {
	components: {
		RaShow: raViewStyle,
		RaCreate: raViewStyle,
		RaEdit: raViewStyle,
		RaSimpleShowLayout: raLayoutStyle,
		RaLayout: {
			styleOverrides: {
				root: {
					'.RaLayout-appFrame': {
						marginTop: appbarHeight,
					},
					'.ra-field': {
						margin: '15px 0',
						p: {
							fontSize: '0.9rem',
							fontWeight: 300,
						},
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
					height: 'unset',
					'.RaSidebar-fixed': {
						position: 'unset',
						minHeight: `calc(100vh - ${appbarHeight}px)`,
					},
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					borderRadius: borderRadius,
					margin: menuItemMargin,
					height: appbarHeight - 2 * menuItemMargin,
					padding: 11,
					border: '1px solid transparent',
				},
			},
		},
	},
}

export default raTheme
