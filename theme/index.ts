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
	},
	fonts: {
		body: 'Golos Text, sans-serif',
		heading: 'Golos Text, sans-serif',
	},
	fontWeights: {
		normal: 425,
	},
	styles: {
		global: (props) => ({
			body: {
				fontFamily: 'body',
				fontSize: 'lg',
				letterSpacing: 'tight',
				wordSpacing: '0.075em',
				fontWeight: 'normal',
				color: mode('gray.700', 'white')(props),
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
