import polyglotI18nProvider from 'ra-i18n-polyglot'
import { resolveBrowserLocale } from 'react-admin'
import englishMessages from '../i18n/en'
import russianMessages from '../i18n/ru'

const i18Provider = polyglotI18nProvider(
	(locale) => (locale === 'ru' ? russianMessages : englishMessages),
	resolveBrowserLocale(),
)

export default i18Provider
