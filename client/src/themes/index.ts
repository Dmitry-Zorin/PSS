import {
	PaletteMode,
	SimplePaletteColorOptions,
	ThemeOptions,
	TypeBackground,
} from '@mui/material'
import { ThemeMode } from 'user'
import darkTheme from './dark.theme'
import lightTheme from './light.theme'

export interface ThemeOptionsExtended extends ThemeOptions {
	palette: {
		mode: PaletteMode
		primary: SimplePaletteColorOptions
		background: TypeBackground
	}
}

const themes = {
	[ThemeMode.Light]: lightTheme,
	[ThemeMode.Dark]: darkTheme,
}

export default themes
