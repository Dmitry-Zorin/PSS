import {
	extendTheme,
	ThemeOverride,
	withDefaultColorScheme,
} from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const themeOverride: ThemeOverride = {
	config: {
		initialColorMode: 'system',
		useSystemColorMode: false,
		disableTransitionOnChange: true,
	},
	fonts: {
		body: 'Golos Text, sans-serif',
		heading: 'Golos Text, sans-serif',
	},
	styles: {
		global: (props) => ({
			body: {
				fontFamily: 'body',
				fontSize: 'lg',
				wordSpacing: '0.05em',
				fontWeight: 'normal',
				color: mode('black', 'white')(props),
				bg: mode('white', 'gray.800')(props),
				border: mode('whiteAlpha.200', 'blackAlpha.200')(props),
			},
			'h1, h2, h3': {
				color: mode('gray.600', 'gray.500')(props),
			},
		}),
	},
	semanticTokens: {
		colors: {
			primary: { default: 'pink.500', _dark: 'pink.500' },
			'primary-light': { default: 'pink.400', _dark: 'pink.400' },
			'primary-dark': { default: 'pink.600', _dark: 'pink.600' },
			secondary: { default: 'blue.500', _dark: 'blue.500' },
			'secondary-light': { default: 'blue.400', _dark: 'blue.400' },
			'secondary-dark': { default: 'blue.600', _dark: 'blue.600' },
			tertiary: { default: 'purple.500', _dark: 'purple.500' },
			'tertiary-light': { default: 'purple.400', _dark: 'purple.400' },
			'tertiary-dark': { default: 'purple.600', _dark: 'purple.600' },
			'text-secondary': { default: 'gray.600', _dark: 'gray.400' },
		},
	},
	components: {},
}

export default extendTheme(
	themeOverride,
	withDefaultColorScheme({ colorScheme: '' }),
)
