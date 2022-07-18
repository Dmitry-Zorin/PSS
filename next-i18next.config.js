const i18nextConfig = {
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'en',
		...(typeof window === undefined
			? { localePath: path.resolve('./public/locales') }
			: {}),
	},
}

module.exports = i18nextConfig
