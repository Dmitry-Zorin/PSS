import { amber, blueGrey, indigo } from '@mui/material/colors'
import extend from 'just-extend'
import muiTheme from './muiTheme'
import raTheme from './raTheme'

const commonTheme = extend(true, raTheme, muiTheme)

const createMyTheme = (theme) => {
	return extend(true, theme, commonTheme)
}

export const themes = {
	common: commonTheme,
	light: createMyTheme({
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
	}),
	dark: createMyTheme({
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
	}),
}
