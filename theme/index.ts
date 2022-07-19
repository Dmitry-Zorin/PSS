import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import colorTokens from './color-tokens'
import colors from './colors'

const systemFonts =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

export default extendTheme(
	{
		config: {
			initialColorMode: 'dark',
			disableTransitionOnChange: true,
		},
		fonts: {
			body: `Golos Text, ${systemFonts}`,
			heading: `Golos Text, ${systemFonts}`,
		},
		styles: {
			global: {
				body: {
					color: 'text',
					bg: 'bg',
					fontSize: 'lg',
					wordSpacing: '0.05em',
				},
				'*, *::before, &::after': {
					borderColor: 'border',
				},
				h1: {
					color: 'primary',
				},
				h2: {
					color: 'secondary',
				},
				h3: {
					color: 'text-secondary',
				},
			},
		},
		colors: {
			...colors,
			primary: colors.blue,
			secondary: colors.cyan,
		},
		semanticTokens: {
			colors: colorTokens,
		},
	},
	withDefaultColorScheme({ colorScheme: 'primary' }),
)
