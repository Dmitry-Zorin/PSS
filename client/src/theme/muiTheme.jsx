export default {
	shape: {
		borderRadius: 6,
	},
	typography: {
		fontWeight: 300,
	},
	sidebar: {
		width: 250,
		closedWidth: 56,
	},
	components: {
		MuiToolbar: {
			styleOverrides: {
				dense: {
					height: 56,
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontWeight: 300,
					minHeight: '45px',
					'&:hover': {
						background: 'rgba(0, 0, 0, 0.05)',
					},
				},
			},
		},
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
					padding: 8,
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					'&:hover': {
						background: 'transparent',
					},
				},
			},
		},
	},
}
