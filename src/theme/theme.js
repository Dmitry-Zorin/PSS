import { indigo, amber, blueGrey } from '@material-ui/core/colors'
import merge from 'lodash/merge'
import muiTheme from './muiTheme'
import raTheme from './raTheme'

const createMyTheme = (theme) => (
	merge(theme, raTheme, muiTheme)
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
