export default {
	debug: process.env.NODE_ENV !== 'production',
	supportedLngs: ['ru'],
	fallbackLng: 'ru',
	defaultNS: 'common',
	react: {
		useSuspense: false,
	},
}
