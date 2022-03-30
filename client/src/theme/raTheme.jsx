const raViewStyle = {
	styleOverrides: {
		root: {
			width: '100%',
			maxWidth: '1250px !important',
			margin: '0 auto',
		},
	},
}

export default {
	components: {
		RaShow: raViewStyle,
		RaCreate: raViewStyle,
		RaEdit: raViewStyle,
		RaLayout: {
			styleOverrides: {
				root: {
					marginTop: '8px !important',
					'& .ra-field': {
						margin: '0 0 35px 0',
						'& span *': {
							fontSize: '1rem',
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
