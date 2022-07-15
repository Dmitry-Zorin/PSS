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
		}),
	},
	semanticTokens: {
		colors: {
			// primary: {
			// 	default: baseTheme.colors.pink,
			// 	_dark: baseTheme.colors.orange,
			// },
			// secondary: baseTheme.colors.blue,
			// text: {
			// 	secondary: baseTheme.colors.gray[400],
			// },
		},
	},
	components: {},
}

export default extendTheme(
	themeOverride,
	withDefaultColorScheme({ colorScheme: 'primary' }),
)
