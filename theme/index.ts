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
		'sm-': '0.8125rem',
		'md-': '0.9375rem',
	},
	letterSpacings: {
		tighter: '-0.04rem',
		tight: '-0.03rem',
		normal: '-0.02rem',
		wide: '0rem',
		wider: '0.02rem',
		widest: '0.04rem',
	},
	styles: {
		global: {
			body: {
				bg: 'bg-layer-1',
				color: 'text',
				fontSize: 'lg',
				letterSpacing: 'normal',
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
