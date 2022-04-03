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
			padding: '15px 40px'
		},
	},
}

export default {
	components: {
		RaShow: raViewStyle,
		RaCreate: raViewStyle,
		RaEdit: raViewStyle,
		RaSimpleShowLayout: raLayoutStyle,
		RaSimpleCreateLayout: raLayoutStyle,
		RaSimpleEditLayout: raLayoutStyle,
		RaLayout: {
			styleOverrides: {
				root: {
					marginTop: '8px !important',
					'& .ra-field': {
						margin: '15px 0',
						'& p': {
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
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					fontWeight: 300,
					minHeight: '45px !important',
					'&:hover': {
						background: 'rgba(0, 0, 0, 0.05)',
					},
				},
				active: {
					background: 'rgba(0, 0, 0, 0.15)',
					'& svg': {
						color: 'rgba(0, 0, 0, 0.65)',
					},
				},
				icon: {
					minWidth: 45,
				},
			},
		},
	},
}
