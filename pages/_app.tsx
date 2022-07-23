import { ChakraProvider } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { GetStaticProps } from 'next'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import 'public/fonts/Golos-Text/Golos-Text.css'
import theme from 'theme'

config.autoAddCss = false

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale!, ['common']),
	}
}

export default appWithTranslation(({ Component, pageProps }) => {
	const { t } = useTranslation('common')
	// const router = useRouter()

	// useEffect(() => {
	// 	router.replace(router.asPath, router.asPath, { locale: 'ru' })
	// }, [router])

	return (
		<>
			<Head>
				<title>{t('name')}</title>
				<meta name="description" content={t('description')} />
			</Head>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</>
	)
})
