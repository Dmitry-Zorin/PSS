import Backend from 'i18next-fs-backend'
import { resolve } from 'node:path'
import { RemixI18Next } from 'remix-i18next'
import i18nextOptions from '~/i18next.options'

export const i18next = new RemixI18Next({
	detection: {
		supportedLanguages: i18nextOptions.supportedLngs,
		fallbackLanguage: i18nextOptions.fallbackLng,
	},
	i18next: {
		backend: {
			loadPath: resolve('public/locales/{{lng}}/{{ns}}.json'),
		},
	},
	backend: Backend,
})
