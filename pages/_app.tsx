import { ChakraProvider } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import { useScrollRestoration } from 'hooks'
import { queryClientConfig } from 'lib/common'
import { GetStaticProps } from 'next'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import 'public/fonts/Golos-Text/Golos-Text.css'
import { useState } from 'react'
import theme from 'theme'

config.autoAddCss = false

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['common']),
	}
}

export default appWithTranslation(({ Component, pageProps }) => {
	const { t } = useTranslation('common')
	useScrollRestoration()

	const [queryClient] = useState(() => {
		return new QueryClient(queryClientConfig)
	})

	return (
		<>
			<Head>
				<title>{t('name')}</title>
				<meta name="description" content={t('description')} />
			</Head>
			<ChakraProvider theme={theme}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<Component {...pageProps} />
						{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					</Hydrate>
				</QueryClientProvider>
			</ChakraProvider>
		</>
	)
})
