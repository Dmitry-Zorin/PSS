import polyglotI18nProvider from 'ra-i18n-polyglot'
import { resolveBrowserLocale } from 'react-admin'
import englishMessages from './messages/en'
import russianMessages from './messages/ru'

const i18Provider = polyglotI18nProvider(
	(locale) => (locale === 'ru' ? russianMessages : englishMessages),
	resolveBrowserLocale(),
)

export default i18Provider
