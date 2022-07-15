import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { EntryContext, Headers } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { createInstance } from 'i18next'
import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import { renderToString } from 'react-dom/server'
import { initReactI18next } from 'react-i18next'
import themes from '~/themes'
import createEmotionCache from './createEmotionCache'
import i18nextOptions from './i18next.options'
import { i18next } from './lib/i18n.server'

export default async function handleRequest(
	request: Request,
	statusCode: number,
	headers: Headers,
	context: EntryContext,
) {
	await createInstance()
		.use(initReactI18next)
		.use(Backend)
		.init({
			...i18nextOptions,
			lng: await i18next.getLocale(request),
			ns: i18next.getRouteNamespaces(context),
			backend: {
				loadPath: resolve('public/locales/{{lng}}/{{ns}}.json'),
			},
		})

	const markup = renderToString(
		<CacheProvider value={createEmotionCache()}>
			<ThemeProvider theme={themes.dark}>
				<CssBaseline enableColorScheme />
				<RemixServer context={context} url={request.url} />
			</ThemeProvider>
		</CacheProvider>,
	)

	headers.set('Content-Type', 'text/html')

	return new Response(`<!DOCTYPE html>${markup}`, {
		status: statusCode,
		headers,
	})
}
