const i18nextConfig = {
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'en',
		...(typeof window === undefined
			? { localePath: path.resolve('./apps/pss/public/locales') }
			: {}),
	},
}

module.exports = i18nextConfig
