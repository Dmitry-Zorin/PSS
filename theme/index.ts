import { extendTheme } from '@chakra-ui/react'
import Color from 'color'
import { mapValues } from 'lodash'
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
		...mapValues(colors, (value, colorName) => {
			return mapValues(value, (colorString) => {
				let color = Color(colorString)
				color = color.hue(Color(value[300]).hue())
				if (colorName === 'gray') {
					color = color.hue(230)
				}
				if (colorName === 'slate') {
					color = color.hue(230)
				}
				if (colorName === 'teal') {
					color = color.alpha(0.8)
				}
				return color.string()
			})
		}),
		primary: colors.indigo,
		secondary: colors.teal,
	},
	semanticTokens: {
		colors: colorTokens,
	},
})
