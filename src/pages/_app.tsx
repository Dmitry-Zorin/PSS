import { Box } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Layout } from 'components'
import { useScrollRestoration } from 'hooks'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import QueryProvider from 'providers/QueryProvider'
import ThemeProvider from 'providers/ThemeProvider'
import { ReactElement, ReactNode } from 'react'
import '../../public/fonts/Golos-Text/Golos-Text.css'

config.autoAddCss = false

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	useScrollRestoration()

	const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<ThemeProvider>
				<QueryProvider state={pageProps.dehydratedState}>
					{getLayout(<Component {...pageProps} />)}
				</QueryProvider>
			</ThemeProvider>
		</>
	)
}
