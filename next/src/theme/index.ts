import {
	extendTheme,
	theme as baseTheme,
	ThemeOverride,
	withDefaultColorScheme,
} from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const themeOverride: ThemeOverride = {
	nonce: '123',
	config: {
		initialColorMode: 'system',
		useSystemColorMode: false,
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
				letterSpacing: 'tight',
				wordSpacing: '0.075em',
				fontWeight: 425,
				color: mode('gray.700', 'white')(props),
				bg: mode('white', 'gray.800')(props),
			},
		}),
	},
	colors: {
		primary: {
			...baseTheme.colors.pink,
			500: baseTheme.colors.orange[200],
		},
		secondary: baseTheme.colors.blue,
		border: baseTheme.colors.orange,
		text: {
			secondary: baseTheme.colors.gray[400],
		},
	},
	components: {},
}

export default extendTheme(
	themeOverride,
	withDefaultColorScheme({ colorScheme: 'primary' }),
)
