import { ChakraProvider } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {
	Hydrate,
	QueryClient,
	QueryClientConfig,
	QueryClientProvider,
	QueryFunction,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GetStaticProps } from 'next'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import 'public/fonts/Golos-Text/Golos-Text.css'
import { useState } from 'react'
import theme from 'theme'
import { createUrlWithQuery } from 'utils/requests'

config.autoAddCss = false

const defaultQueryFn: QueryFunction<
	any,
	[string, Record<string, any>]
> = async ({ queryKey }) => {
	const res = await fetch(
		createUrlWithQuery({
			protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
			host: process.env.NEXT_PUBLIC_VERCEL_URL!,
			path: 'api',
			subpath: queryKey[0],
			query: queryKey[1],
		}),
	)
	if (!res.ok) {
		throw new Error(res.statusText)
	}
	return res.json()
}

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn as any,
			staleTime: 60 * 1000,
		},
	},
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['common']),
	}
}

export default appWithTranslation(({ Component, pageProps }) => {
	const { t } = useTranslation('common')
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
						<ReactQueryDevtools initialIsOpen={false} />
					</Hydrate>
				</QueryClientProvider>
			</ChakraProvider>
		</>
	)
})
