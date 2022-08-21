import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useScrollRestoration } from 'hooks'
import { AppProps } from 'next/app'
import Head from 'next/head'
import QueryProvider from 'providers/QueryProvider'
import ThemeProvider from 'providers/ThemeProvider'
import '../../public/fonts/Golos-Text/Golos-Text.css'

config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
	useScrollRestoration()
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<ThemeProvider>
				<QueryProvider state={pageProps.dehydratedState}>
					<Component {...pageProps} />
				</QueryProvider>
			</ThemeProvider>
		</>
	)
}
