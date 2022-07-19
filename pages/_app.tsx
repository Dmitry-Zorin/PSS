import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'public/fonts/Golos-Text/Golos-Text.css'
import theme from 'theme'
// import {
// 	ThemeEditorProvider,
// 	HyperThemeEditor,
// } from '@hypertheme-editor/chakra-ui'

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: await serverSideTranslations(locale, ['about', 'common']),
	}
}

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
	const { t } = useTranslation('common')
	return (
		<>
			<Head>
				<title>{t('name')}</title>
				<meta name="description" content={t('description')} />
			</Head>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
				{/* <ThemeEditorProvider>
					<HyperThemeEditor pos="fixed" bottom={4} right={2} />
				</ThemeEditorProvider> */}
			</ChakraProvider>
		</>
	)
})
