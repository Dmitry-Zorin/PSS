const { i18n } = require('./next-i18next.config')
require('./server/env')

const isDev = process.env.NODE_ENV === 'development'

const csp = [
	"default-src 'self' vitals.vercel-insights.com",
	"style-src 'self' 'unsafe-inline'",
	"script-src 'self' 'unsafe-eval' 'unsafe-inline'",
]

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n,
	async rewrites() {
		return [
			{
				source: `/authors/:id`,
				destination: '/authors/show',
			},
			{
				source: `/publications/:category`,
				destination: '/publications/list',
			},
			{
				source: `/publications/:category/create`,
				destination: '/publications/create',
			},
			{
				source: `/publications/:category/:id`,
				destination: '/publications/show',
			},
			{
				source: `/publications/:category/edit/:id`,
				destination: '/publications/edit',
			},
		]
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Referrer-Policy',
						value: 'strict-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'geolocation=(), microphone=(), camera=()',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'Content-Security-Policy',
						value: isDev ? '' : csp.join(';'),
					},
				],
			},
		]
	},
}

module.exports = nextConfig
