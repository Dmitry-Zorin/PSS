export default {
	shape: {
		borderRadius: 6,
	},
	typography: {
		fontWeight: 300,
	},
	sidebar: {
		width: 200,
		closedWidth: 57,
	},
	overrides: {
		MuiCardContent: {
			root: {
				padding: '45px',
			},
		},
		MuiTab: {
			root: {
				flexGrow: 1,
				maxWidth: 'unset',
			},
		},
		MuiTableCell: {
			sizeSmall: {
				padding: 16,
			},
		},
		MuiIconButton: {
			root: {
				'&:hover': {
					background: 'transparent',
				},
			},
		},
	},
}
