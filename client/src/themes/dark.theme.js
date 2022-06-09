import { common, lightGreen } from '@mui/material/colors'
import { createTheme } from './theme-creator'

const colors = {
	primary: lightGreen[400],
	secondary: lightGreen[400],
	bgPrimary: '#272C34',
	divider: 'rgba(255, 255, 255, 0.1)',
	text: common.white,
}

export const darkTheme = createTheme(colors, {
	palette: {
		mode: 'dark',
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					background: 'none',
				},
			},
		},
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					'&:hover': {
						background: 'rgba(255, 255, 255, 0.04)',
					},
					'&.RaMenuItemLink-active': {
						background: 'rgba(255, 255, 255, 0.08)',
					},
				},
			},
		},
	},
})
