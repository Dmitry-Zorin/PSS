import { merge } from 'lodash'
import darkTheme from './dark.theme'
import lightTheme from './light.theme'
import muiTheme from './mui.theme'
import raTheme from './ra.theme'

export default {
	common: merge({}, muiTheme, raTheme),
	light: merge({}, muiTheme, raTheme, lightTheme),
	dark: merge({}, muiTheme, raTheme, darkTheme),
}
