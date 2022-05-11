export const appbarHeight = 56

export default {
	shape: {
		borderRadius: 8,
	},
	sidebar: {
		width: 250,
		closedWidth: 56,
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow: 'none',
				},
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
					height: appbarHeight,
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
		MuiTableRow: {
			styleOverrides: {
				root: {
					'&:last-of-type td': {
						borderBottom: 0,
					},
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
