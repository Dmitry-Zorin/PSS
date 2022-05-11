import { appbarHeight } from './muiTheme'

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

export default {
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
		RaTabbedShowLayout: {
			styleOverrides: {
				content: {
					padding: 0,
				},
			},
		},
		RaSidebar: {
			styleOverrides: {
				root: {
					'.RaSidebar-fixed': {
						height: `calc(100vh - ${appbarHeight}px)`,
					},
				},
			},
		},
		RaMenu: {
			styleOverrides: {
				root: {
					'.RaMenuItemLink-icon': {
						minWidth: 36,
					},
					'&.RaMenu-closed .RaMenuItemLink-icon': {
						minWidth: 40,
					},
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					fontWeight: 300,
					minHeight: '45px !important',
					borderRadius: 8,
					margin: 4,
					padding: '10px 12px',
					border: '1px solid transparent',
				},
			},
		},
	},
}
