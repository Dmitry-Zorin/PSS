import { ChakraProvider } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { httpLink } from '@trpc/client/links/httpLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import queryClientConfig from 'constants/queryClientConfig'
import { useScrollRestoration } from 'hooks'
import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query/devtools'
import { AppRouter } from 'server/routers/_app'
import superjson from 'superjson'
import theme from 'theme'
import { getBaseUrl, SSRContext } from 'utils'
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
	ssr: true,
	responseMeta(opts) {
		const ctx = opts.ctx as SSRContext
		if (ctx.status) {
			return {
				status: ctx.status,
			}
		}

		const error = opts.clientErrors[0]
		if (error) {
			return {
				status: error.data?.httpStatus ?? 500,
			}
		}

		return {
			headers: {
				'Cache-Control': `s-maxage=1, stale-while-revalidate=${
					30 * 24 * 60 * 60
				}`,
			},
		}
	},
})(({ Component, pageProps }) => {
	useScrollRestoration()

	return (
		<ChakraProvider theme={theme}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
			<ReactQueryDevtools />
		</ChakraProvider>
	)
})
