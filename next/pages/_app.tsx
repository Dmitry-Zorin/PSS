import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import 'styles/globals.css'
import theme from '~/theme'

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
})
