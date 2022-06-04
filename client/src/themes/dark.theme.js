import { amber, blueGrey } from '@mui/material/colors'

const darkTheme = {
	palette: {
		mode: 'dark',
		primary: {
			light: amber[200],
			main: amber[300],
			dark: amber[400],
		},
		background: {
			default: blueGrey[800],
			paper: blueGrey[900],
		},
	},
	components: {
		RaSidebar: {
			styleOverrides: {
				root: {
					backgroundColor: blueGrey[900],
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					'&:hover': {
						background: 'rgba(0, 0, 0, 0.05)',
					},
					'&.RaMenuItemLink-active': {
						borderColor: 'rgba(255, 255, 255, 0.06)',
						background: 'rgba(0, 0, 0, 0.1)',
						'&, & *': {
							color: amber[300],
						},
					},
				},
			},
		},
	},
}

export default darkTheme
