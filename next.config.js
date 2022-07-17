const { i18n } = require('./next-i18next.config')

const csp = [
	"default-src 'self'",
	"style-src 'self' 'unsafe-inline'",
	"script-src-elem 'self' 'unsafe-inline'",
	"object-src 'none'",
]

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n,
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
						value: process.env.NODE_ENV === 'production' ? csp.join(';') : '*',
					},
				],
			},
		]
	},
}

module.exports = nextConfig
