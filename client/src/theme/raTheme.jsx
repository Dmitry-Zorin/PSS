const raViewStyle = {
	styleOverrides: {
		root: {
			width: '100%',
			maxWidth: '1250px',
			margin: '0 auto',
		},
	},
}

export default {
	components: {
		RaAppBar: {
			toolbar: {
				minHeight: 56,
			},
		},
		RaUserMenu: {
			userButton: {
				'& svg': {
					fontSize: 24,
				},
			},
		},
		RaShow: raViewStyle,
		RaCreate: raViewStyle,
		RaEdit: raViewStyle,
		RaLayout: {
			root: {
				'& .ra-field > div[class^="MuiFormControl"]': {
					width: '100%',
					margin: '0 0 35px 0',
				},
			},
			appFrame: {
				marginTop: '56px !important',
			},
			content: {
				paddingTop: 24,
			},
		},
		RaTabbedShowLayout: {
			content: {
				padding: 0,
			},
		},
		RaMenuItemLink: {
			root: {
				fontWeight: 300,
				minHeight: '45px',
				'&:hover': {
					background: 'rgba(0, 0, 0, 0.05)',
				},
			},
			active: {
				//background: 'rgba(0, 0, 0, 0.15)',
				'& svg': {
					color: 'rgba(0, 0, 0, 0.65)',
				},
			},
			icon: {
				minWidth: 45,
			},
		},
		RaLabeled: {
			label: {
				fontSize: '1.25rem',
			},
			value: {
				'& > *': {
					fontSize: '1rem',
				},
			},
		},
	},
}
