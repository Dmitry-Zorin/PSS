import {
	PaletteMode,
	PaletteOptions,
	SimplePaletteColorOptions,
	TypeBackground,
} from '@mui/material'
import { ThemeMode } from 'user'
import commonOptions from './common.options'
import darkOptions from './dark.options'
import lightOptions from './light.options'

export interface ThemePaletteOptions extends PaletteOptions {
	mode: PaletteMode
	primary: SimplePaletteColorOptions
	background: TypeBackground
}

export type ThemeOptionsExtended = typeof commonOptions & {
	palette: ThemePaletteOptions
}

function createTheme(
	paletteOptions: ThemePaletteOptions,
): ThemeOptionsExtended {
	return { ...commonOptions, palette: paletteOptions }
}

const themes: Record<ThemeMode, ThemeOptionsExtended> = {
	light: createTheme(lightOptions),
	dark: createTheme(darkOptions),
}

export default themes

declare module '@mui/material/styles' {
	interface Theme extends ThemeOptionsExtended {}
	interface TypeBackground {
		sidebar: string
	}
}
