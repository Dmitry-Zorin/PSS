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
	components: {
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: 45,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					flexGrow: 1,
					maxWidth: 'unset',
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				sizeSmall: {
					padding: 16,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					'&:hover': {
						// background: 'transparent',
					},
				},
			},
		},
	},
}
