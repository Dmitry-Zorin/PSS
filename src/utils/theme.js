import { blueGrey, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	typography: {
		fontFamily: 'Nunito',
	},
	palette: {
		primary: {
			light: blueGrey[600],
			main: blueGrey[700],
			dark: blueGrey[800]
		},
		secondary: {
			light: red[300],
			main: red[500],
			dark: red[700]
		}
	},
	overrides: {
		RaMenuItemLink: {
			root: {
				borderLeft: '3px solid transparent'
			},
			active: {
				borderLeft: `3px solid ${red[500]}`,
				background: 'rgba(0, 0, 0, 0.04) !important',
				'& svg': {
					color: 'rgba(0, 0, 0, 0.65)'
				}
			}
		}
	}
})
