const path = require('path')

const i18nextConfig = {
	i18n: {
		locales: ['en', 'ru'],
		defaultLocale: 'ru',
		localePath: path.resolve('./public/locales'),
	},
}

module.exports = i18nextConfig
