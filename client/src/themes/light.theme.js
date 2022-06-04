import { blueGrey, indigo } from '@mui/material/colors'

const lightTheme = {
	palette: {
		mode: 'light',
		primary: {
			light: indigo[400],
			main: indigo[500],
			dark: indigo[600],
		},
		background: {
			default: blueGrey[50],
		},
	},
	components: {
		RaSidebar: {
			styleOverrides: {
				root: {
					backgroundColor: 'white',
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					'&:hover': {
						background: 'rgba(0, 0, 0, 0.0375)',
					},
					'&.RaMenuItemLink-active': {
						borderColor: 'rgba(0, 0, 0, 0.04)',
						background: 'rgba(0, 0, 0, 0.075)',
						'&, & *': {
							color: indigo[500],
						},
					},
				},
			},
		},
	},
}

export default lightTheme
