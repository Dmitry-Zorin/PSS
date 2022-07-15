import { ChakraProvider, useColorMode, useTheme } from '@chakra-ui/react'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'public/fonts/Golos-Text/Golos-Text.css'
import theme from 'theme'

export async function getStaticProps({ locale }: { locale: string }) {
	return {
		props: await serverSideTranslations(locale, ['about', 'common']),
	}
}

function ThemeColorSetter() {
	const { colorMode } = useColorMode()
	const themeColor = useTheme().styles.global({ colorMode }).body.bg

	return (
		<Head>
			<meta name="theme-color" content={themeColor} />
		</Head>
	)
}

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
	const { t } = useTranslation('common')

	return (
		<ChakraProvider theme={theme}>
			<Head>
				<title>{t('name')}</title>
				<meta name="description" content={t('description')} />
			</Head>
			<ThemeColorSetter />
			<Component {...pageProps} />
		</ChakraProvider>
	)
})
