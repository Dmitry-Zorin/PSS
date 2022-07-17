import {
	extendTheme,
	ThemeOverride,
	withDefaultColorScheme,
} from '@chakra-ui/react'
import colors from './colors'
import shadows from './shadows'

const systemFonts =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const themeOverride: ThemeOverride = {
	config: {
		initialColorMode: 'system',
		disableTransitionOnChange: true,
	},
	fonts: {
		body: `Golos Text, ${systemFonts}`,
		heading: `Golos Text, ${systemFonts}`,
	},
	styles: {
		global: {
			body: {
				fontSize: 'lg',
				wordSpacing: '0.05em',
			},
			'*, *::before, &::after': {
				borderColor: 'border',
			},
			h1: {
				color: 'h1',
			},
			h2: {
				color: 'h2',
			},
		},
	},
	semanticTokens: {
		colors,
		shadows,
	},
}

export default extendTheme(
	themeOverride,
	withDefaultColorScheme({ colorScheme: 'blue' }),
)
