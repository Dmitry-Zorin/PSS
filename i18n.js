const hoistNonReactStatics = require('hoist-non-react-statics')

module.exports = {
	locales: ['en', 'ru'],
	defaultLocale: 'ru',
	defaultNS: 'common',
	staticsHoc: hoistNonReactStatics,
	pages: {
		'*': ['common'],
		'/': ['index'],
		'/about': ['about'],
		'/timeline': ['resources'],
		'rgx:/create$': ['resources', 'validations'],
		'rgx:/edit/': ['resources', 'validations'],
		'/authors/[id]': ['resources', 'author', 'publicationList'],
		'/publications/[category]/[id]': ['resources'],
	},
}
