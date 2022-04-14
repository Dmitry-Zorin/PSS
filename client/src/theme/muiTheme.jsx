export default {
	shape: {
		borderRadius: 6,
	},
	sidebar: {
		width: 250,
		closedWidth: 56,
	},
	components: {
		MuiPaper: {
			defaultProps: {
				// variant: 'outlined'
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontWeight: 300,
				},
				body2: {
					fontSize: '1rem',
				},
			},
		},
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
					padding: 12,
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
		MuiChip: {
			styleOverrides: {
				labelMedium: {
					fontSize: '0.95rem',
					fontWeight: 300,
				},
			},
		},
	},
}
