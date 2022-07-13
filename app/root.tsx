import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import globalStyles from '~/styles/global.css'

export const meta: MetaFunction = () => ({
	title: 'PSS',
	charset: 'utf-8',
	viewport: 'width=device-width,initial-scale=1',
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

const App = () => (
	<html lang="en">
		<head>
			<Meta />
			<Links />
		</head>
		<body>
			<Outlet />
			<ScrollRestoration />
			<Scripts />
			<LiveReload />
		</body>
	</html>
)

export default App
