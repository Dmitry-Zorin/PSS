import { amber, blueGrey, indigo } from '@mui/material/colors'
import extend from 'just-extend'
import muiTheme from './muiTheme'
import raTheme from './raTheme'

const createMyTheme = (theme) => (
	extend(true, theme, raTheme, muiTheme)
)

export const themes = {
	light: createMyTheme({
		palette: {
			mode: 'light',
		},
		overrides: {
			RaMenuItemLink: {
				active: {
					color: indigo[500],
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
		overrides: {
			RaMenuItemLink: {
				active: {
					color: amber[300],
				},
			},
		},
	}),
}
