import { amber, blueGrey, indigo } from '@material-ui/core/colors'
import extend from 'just-extend'
import muiTheme from './muiTheme'
import raTheme from './raTheme'

const createMyTheme = (theme) => (
	extend(true, theme, raTheme, muiTheme)
)

const themes = {
	light: createMyTheme({
		palette: {
			type: 'light',
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
			type: 'dark',
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

export const getTheme = (name) => themes[name]
