import { extendTheme } from '@chakra-ui/react'
import colors from './colors'
import colorTokens from './colorTokens'
import components from './components'

const systemFonts =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

export default extendTheme({
	config: {
		initialColorMode: 'system',
		disableTransitionOnChange: true,
	},
	fonts: {
		body: `Golos Text, ${systemFonts}`,
		heading: `Golos Text, ${systemFonts}`,
	},
	fontSizes: {
		'2xs': '0.75rem',
		xs: '0.875rem',
		sm: '0.9375rem',
	},
	styles: {
		global: {
			body: {
				color: 'text',
				bg: 'bg-layer-1',
				fontSize: 'lg',
				letterSpacing: '-0.02rem',
				scrollBehavior: 'smooth',
			},
			'*, *::before, &::after': {
				borderColor: 'border',
			},
			h1: {
				color: 'primary',
			},
		},
	},
	colors,
	semanticTokens: {
		colors: colorTokens,
	},
	components,
})
