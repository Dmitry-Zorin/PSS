import { amber, blueGrey } from '@mui/material/colors'
import { merge } from 'lodash'
import { baseTheme } from './base.theme'

export const darkTheme = merge({}, baseTheme, {
	palette: {
		mode: 'dark',
		primary: {
			light: '#FFDF6C',
			main: '#FFDF6C',
			dark: '#FFDF6C',
		},
		background: {
			default: blueGrey[800],
			paper: '#494D5f',
		},
	},
	components: {
		RaSidebar: {
			styleOverrides: {
				root: {
					'.RaSidebar-fixed': {
						background: blueGrey[900],
					},
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
							color: '#FFDF6C',
						},
					},
				},
			},
		},
	},
})
