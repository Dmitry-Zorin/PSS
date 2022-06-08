import { merge } from 'lodash'
import { muiTheme } from './mui.theme'
import { raTheme } from './ra.theme'

export const baseTheme = merge({}, muiTheme, raTheme)
