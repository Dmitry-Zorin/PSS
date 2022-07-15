export default {
	debug: process.env.NODE_ENV !== 'production',
	supportedLngs: ['en', 'ru'],
	fallbackLng: 'en',
	defaultNS: 'common',
	react: {
		useSuspense: false,
	},
}
