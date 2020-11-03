import { grey, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
	typography: {
		fontFamily: 'Nunito',
	},
	palette: {
		primary: {
			light: grey[700],
			main: grey[800],
			dark: grey[900]
		},
		secondary: {
			light: red[300],
			main: red[500],
			dark: red[700]
		}
	}
})
