import { common, grey, indigo } from '@mui/material/colors'
import { createTheme } from './theme-creator'

const colors = {
	primary: indigo[500],
	secondary: indigo[500],
	bgPrimary: grey[50],
	divider: 'rgba(0, 0, 0, 0.09)',
	text: common.black,
}

export const lightTheme = createTheme(colors, {
	palette: {
		mode: 'light',
	},
	components: {
		RaMenuItemLink: {
			styleOverrides: {
				root: {
					'&:hover': {
						background: 'rgba(0, 0, 0, 0.03)',
					},
					'&.RaMenuItemLink-active': {
						background: 'rgba(0, 0, 0, 0.05)',
					},
				},
			},
		},
	},
})
