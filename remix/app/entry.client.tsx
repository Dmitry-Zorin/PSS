import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { RemixBrowser } from '@remix-run/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-fs-backend'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { getInitialNamespaces } from 'remix-i18next'
import ClientStyleContext from '~/components/ClientStyleContext'
import themes from '~/themes'
import createEmotionCache from './createEmotionCache'
import i18nextOptions from './i18next.options'

function ClientCacheProvider({ children }: { children: ReactNode }) {
	const [cache, setCache] = useState(createEmotionCache())

	return (
		<ClientStyleContext.Provider
			value={{ reset: () => setCache(createEmotionCache()) }}
		>
			<CacheProvider value={cache}>{children}</CacheProvider>
		</ClientStyleContext.Provider>
	)
}

i18next
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(Backend)
	.init({
		...i18nextOptions,
		ns: getInitialNamespaces(),

		backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
		detection: {
			order: ['htmlTag'],
			caches: [],
		},
	})
	.then(() => {
		return hydrateRoot(
			document,
			<I18nextProvider i18n={i18next}>
				<ClientCacheProvider>
					<ThemeProvider theme={themes.dark}>
						<CssBaseline enableColorScheme />
						<RemixBrowser />
					</ThemeProvider>
				</ClientCacheProvider>
			</I18nextProvider>,
		)
	})
