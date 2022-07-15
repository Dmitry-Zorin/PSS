import { ChakraProvider } from '@chakra-ui/react'
import 'globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import theme from 'theme'

export default appWithTranslation(({ Component, pageProps }: AppProps) => {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
})
