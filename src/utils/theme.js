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
	}
})
