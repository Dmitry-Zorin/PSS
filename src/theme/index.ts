import colorTokens from './colorTokens'
import components from './components'

const systemFonts =
	'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const theme = {
	config: {
		initialColorMode: 'system' as const,
		disableTransitionOnChange: true,
	},
	fonts: {
		body: `Golos Text, ${systemFonts}`,
		heading: `Golos Text, ${systemFonts}`,
	},
	fontSizes: {
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
	transition: {
		duration: {
			faster: '75ms',
			fast: '100ms',
			normal: '150ms',
			slow: '200ms',
			slower: '300ms',
		},
	},
	styles: {
		global: {
			body: {
				bg: 'bg-layer-1',
				color: 'text',
				fontSize: 'lg',
				letterSpacing: 'normal',
				scrollBehavior: 'smooth',
				overflowX: 'hidden',
				overflowY: 'scroll',
				'::-webkit-scrollbar': {
					bg: 'bg',
					w: 2.5,
				},
				'::-webkit-scrollbar-thumb': {
					bg: 'border',
					borderRadius: 'full',
				},
			},
			'*, *::before, &::after': {
				borderColor: 'border',
			},
			h1: {
				color: 'primary',
			},
		},
	},
	semanticTokens: {
		colors: colorTokens,
	},
	components,
}

export default theme
