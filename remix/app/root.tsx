import { withEmotionCache } from '@emotion/react'
import {
	Typography,
	unstable_useEnhancedEffect as useEnhancedEffect,
} from '@mui/material'
import {
	ErrorBoundaryComponent,
	json,
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
	useLoaderData,
} from '@remix-run/react'
import { ComponentProps, ReactNode, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next'
import ClientStyleContext from '~/components/ClientStyleContext'
import { Layout } from '~/layout'
import globalStyles from '~/styles/global.css'
import themes from '~/themes'
import { i18next } from './lib/i18n.server'

// export const handle = {
// 	i18n: 'common',
// }

export const meta: MetaFunction = ({ data }) => ({
	title: data.title,
	charset: 'utf-8',
	viewport: 'width=device-width,initial-scale=1',
	'theme-color': themes.dark.palette.background.default,
})

export const links: LinksFunction = () => {
	return [
		{
			rel: 'preload',
			href: '/fonts/Golos-Text/Golos-Text.woff2',
			as: 'font',
			type: 'font/woff2',
			crossOrigin: 'anonymous',
		},
		{ rel: 'stylesheet', href: globalStyles },
	]
}

interface LoaderData {
	locale: string
	title: string
}

export const loader: LoaderFunction = async ({ request }) => {
	const locale = await i18next.getLocale(request)
	const t = await i18next.getFixedT(request, 'common')
	const title = t('title')
	return json<LoaderData>({ locale, title })
}

const Document = withEmotionCache(
	(
		{ children, error }: { children: ReactNode; error?: boolean },
		emotionCache,
	) => {
		const { i18n } = useTranslation()
		const clientStyleData = useContext(ClientStyleContext)

		if (!error) {
			const { locale } = useLoaderData<LoaderData>()
			useChangeLanguage(locale)
		}

		useEnhancedEffect(() => {
			emotionCache.sheet.container = document.head
			const tags = emotionCache.sheet.tags
			emotionCache.sheet.flush()
			tags.forEach((tag) => {
				;(emotionCache.sheet as any)._insertTag(tag)
			})
			clientStyleData.reset()
		}, [])

		return (
			<html lang={i18n.language}>
				<head>
					<Meta />
					<Links />
				</head>
				<body>
					{children}
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</body>
			</html>
		)
	},
)

export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	)
}

export function ErrorBoundary({
	error,
}: ComponentProps<ErrorBoundaryComponent>) {
	console.error(error)

	return (
		<Document error>
			<Layout>
				<Typography component="h1" variant="h4" pb={3}>
					There was an error
				</Typography>
				<Typography>{error.message}</Typography>
			</Layout>
		</Document>
	)
}

export function CatchBoundary() {
	const caught = useCatch()

	let message
	switch (caught.status) {
		case 401:
			message = (
				<Typography>
					Oops! Looks like you tried to visit a page that you do not have access
					to.
				</Typography>
			)
			break
		case 404:
			message = (
				<Typography>
					Oops! Looks like you tried to visit a page that does not exist.
				</Typography>
			)
			break

		default:
			throw new Error(caught.data || caught.statusText)
	}

	return (
		<Document>
			<Layout>
				<Typography component="h1" variant="h4" pb={3}>
					{caught.status}: {caught.statusText}
				</Typography>
				<Typography>{message}</Typography>
			</Layout>
		</Document>
	)
}
