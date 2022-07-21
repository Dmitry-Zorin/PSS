import { extendTheme } from '@chakra-ui/react'
import colors from './colors'
import colorTokens from './colorTokens'

const systemFonts =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

export default extendTheme({
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
		},
	},
	colors: {
		...colors,
		secondary: colors.gray,
	},
	semanticTokens: {
		colors: colorTokens,
	},
})
