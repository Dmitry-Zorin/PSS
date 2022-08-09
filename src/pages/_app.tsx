import { ChakraProvider } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { httpLink } from '@trpc/client/links/httpLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import queryClientConfig from 'constants/queryClientConfig'
import { usePreconnect, useScrollRestoration } from 'hooks'
import { appWithTranslation } from 'next-i18next'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppRouter } from 'server/routers/_app'
import superjson from 'superjson'
import theme from 'theme'
import { getBaseUrl } from 'utils'
import '../../public/fonts/Golos-Text/Golos-Text.css'

config.autoAddCss = false

export default withTRPC<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: (opts) => {
						return (
							process.env.NODE_ENV === 'development' ||
							(opts.direction === 'down' && opts.result instanceof Error)
						)
					},
				}),
				httpLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			transformer: superjson,
			queryClientConfig,
		}
	},
})(
	appWithTranslation(({ Component, pageProps }) => {
		useScrollRestoration()
		usePreconnect()

		return (
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
				<ReactQueryDevtools />
			</ChakraProvider>
		)
	}),
)
