import { ChakraProvider } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useScrollRestoration } from 'hooks'
import { AppProps } from 'next/app'
import Head from 'next/head'
import theme from 'theme'
import '../../public/fonts/Golos-Text/Golos-Text.css'

config.autoAddCss = false

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 60 * 1000,
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	useScrollRestoration()
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<Component {...pageProps} />
						<ReactQueryDevtools />
					</Hydrate>
				</QueryClientProvider>
			</ChakraProvider>
		</>
	)
}
