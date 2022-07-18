const i18nextConfig = {
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'en',
		...(typeof window === undefined
			? { localePath: path.resolve('./locales') }
			: {}),
	},
}

module.exports = i18nextConfig
